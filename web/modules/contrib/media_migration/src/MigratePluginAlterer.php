<?php

namespace Drupal\media_migration;

use Drupal\Component\Plugin\Exception\PluginException;
use Drupal\Core\Messenger\MessengerInterface;
use Drupal\field\Plugin\migrate\source\d7\Field;
use Drupal\field\Plugin\migrate\source\d7\FieldInstance;
use Drupal\field\Plugin\migrate\source\d7\ViewMode;
use Drupal\migrate\Exception\RequirementsException;
use Drupal\migrate\Plugin\MigrateSourcePluginManager;
use Drupal\migrate\Plugin\MigrationPluginManager;
use Drupal\migrate_drupal\Plugin\migrate\FieldMigration;

/**
 * MigratePluginAlterer service.
 */
class MigratePluginAlterer {

  /**
   * The plugin.manager.migration service.
   *
   * @var \Drupal\migrate\Plugin\MigrationPluginManager
   */
  protected $pluginManagerMigration;

  /**
   * The Migrate source plugin manager service.
   *
   * @var \Drupal\migrate\Plugin\MigrateSourcePluginManager
   */
  protected $sourceManager;

  /**
   * The plugin.manager.media_wysiwyg service.
   *
   * @var \Drupal\media_migration\MediaWysiwygPluginManager
   */
  protected $pluginManagerMediaWysiwyg;

  /**
   * The messenger.
   *
   * @var \Drupal\Core\Messenger\MessengerInterface
   */
  protected $messenger;

  /**
   * Constructs a MigratePluginAlterer object.
   *
   * @param \Drupal\migrate\Plugin\MigrationPluginManager $plugin_manager_migration
   *   The migration plugin manager.
   * @param \Drupal\migrate\Plugin\MigrateSourcePluginManager $source_manager
   *   The Migrate source plugin manager.
   * @param \Drupal\media_migration\MediaWysiwygPluginManager $plugin_manager_media_wysiwyg
   *   The Media WYSIWYG plugin manager.
   * @param \Drupal\Core\Messenger\MessengerInterface $messenger
   *   The messenger.
   */
  public function __construct(MigrationPluginManager $plugin_manager_migration, MigrateSourcePluginManager $source_manager, MediaWysiwygPluginManager $plugin_manager_media_wysiwyg, MessengerInterface $messenger) {
    $this->pluginManagerMigration = $plugin_manager_migration;
    $this->sourceManager = $source_manager;
    $this->pluginManagerMediaWysiwyg = $plugin_manager_media_wysiwyg;
    $this->messenger = $messenger;
  }

  /**
   * Alters migrate plugins.
   *
   * @param array &$migrations
   *   The array of migration plugins.
   *
   * @throws \Drupal\Component\Plugin\Exception\PluginException
   *   If a plugin cannot be found.
   */
  public function alter(array &$migrations) {
    $this->alterFieldMigrations($migrations);
    $this->addMediaWysiwygProcessor($migrations);
  }

  /**
   * Alters field migrations from file_entity/media in 7 to media in 8.
   *
   * @param array &$migrations
   *   The array of migration plugins.
   *
   * @throws \Drupal\Component\Plugin\Exception\PluginException
   *   If a plugin cannot be found.
   */
  protected function alterFieldMigrations(array &$migrations) {
    foreach ($migrations as &$migration) {
      $migration_stub = $this->pluginManagerMigration->createStubMigration($migration);
      $source = NULL;
      $configuration = $migration['source'];
      if (!empty($migration['source']['plugin'])) {
        $source = $this->sourceManager->createInstance($migration['source']['plugin'], $configuration, $migration_stub);
        if ($source) {
          if (is_a($migration['class'], FieldMigration::class, TRUE)) {

            // Field storage, instance, widget and formatter migrations.
            if (is_a($source, Field::class) || is_a($source, FieldInstance::class)) {
              $this->mapFileFields($migration);
            }
          }

          // View Modes.
          if (is_a($source, ViewMode::class)) {
            $this->mapFileToMediaBundle($migration);
          }
        }
      }
    }
  }

  /**
   * Appends a processor to transform media_wysiwyg tokens to entity_embeds.
   *
   * Find field instances with text processing and pass them to a
   * MediaWysiwyg plugin that will add processors to the respective
   * migrations.
   *
   * @see \Drupal\media_migration\Plugin\MediaWysiwyg\Node
   */
  protected function addMediaWysiwygProcessor(array &$migrations) {
    $definition = [
      'source' => [
        'ignore_map' => TRUE,
        'plugin' => 'd7_field_instance',
      ],
      'destination' => [
        'plugin' => 'null',
      ],
      'idMap' => [
        'plugin' => 'null',
      ],
    ];
    $field_instance_migration = $this->pluginManagerMigration
      ->createStubMigration($definition)
      ->getSourcePlugin();

    try {
      $field_instance_migration->checkRequirements();
    }
    catch (RequirementsException $e) {
      // This exception happens when we run migrations with migrate:import or
      // check the status with migrate:update. We just we need to run the
      // code below when we are generating migrations with migrate:upgrade so
      // it is safe to just return here if we reach to this point.
      return;
    }

    /** @var \Drupal\migrate\Row $row */
    foreach ($field_instance_migration as $row) {
      if (1 == $row->getSourceProperty('settings/text_processing')) {
        try {
          $plugin = $this->pluginManagerMediaWysiwyg->createInstance($row->getSourceProperty('entity_type'));
          $migrations = $plugin->process($migrations, $row);
        }
        catch (PluginException $e) {
          $this->messenger->addWarning('Could not find a MediaWysiwyg plugin "' . $row->getSourceProperty('entity_type') .
            '" for field ' . $row->getSourceProperty('field_name') . '. Have a look at \Drupal\media_migration\Plugin\MediaWysiwyg\Node for an example.');
        }
      }
    }
  }

  /**
   * Maps file type fields to media ones.
   *
   * @param array &$migration
   *   The migration to alter.
   */
  protected function mapFileFields(array &$migration) {
    $entity_type_process = $migration['process']['entity_type'];

    if (isset($entity_type_process['media_migration'])) {
      return;
    }
    $entity_type_process = $this->makeAssociative($entity_type_process);

    $entity_type_process['media_migration'] = [
      'plugin' => 'static_map',
      'map' => [
        'file' => 'media',
      ],
      'bypass' => TRUE,
    ];
    $migration['process']['entity_type'] = $entity_type_process;
  }

  /**
   * Adds static mapping from file to media to a entity references.
   *
   * @param array &$migration
   *   The migration to alter.
   */
  protected function mapFileToMediaBundle(array &$migration) {
    $entity_type_process = $migration['process']['targetEntityType'];

    if (isset($entity_type_process['media_migration'])) {
      return;
    }
    $entity_type_process = $this->makeAssociative($entity_type_process);

    $entity_type_process['media_migration'] = [
      'plugin' => 'static_map',
      'map' => [
        'file' => 'media',
      ],
      'bypass' => TRUE,
    ];
    $migration['process']['targetEntityType'] = $entity_type_process;
  }

  /**
   * Ensures that a plugin process mapping is an associative array.
   *
   * @param array|string $plugin_process
   *   The plugin process mapping.
   *
   * @return array
   *   The plugin process mapping as an associative array.
   */
  protected function makeAssociative($plugin_process) {
    if (!is_array($plugin_process)) {
      $plugin_process = [
        [
          'plugin' => 'get',
          'source' => $plugin_process,
        ],
      ];
    }
    elseif (array_key_exists('plugin', $plugin_process)) {
      $plugin_process = [$plugin_process];
    }

    return $plugin_process;
  }

}
