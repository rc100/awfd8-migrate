<?php

namespace Drupal\media_migration;

use Drupal\Component\Plugin\PluginBase;

/**
 * Base class for media_wysiwyg plugins.
 */
abstract class MediaWysiwygPluginBase extends PluginBase implements MediaWysiwygInterface {

  /**
   * {@inheritdoc}
   */
  public function label() {
    // Cast the label to a string since it is a TranslatableMarkup object.
    return (string) $this->pluginDefinition['label'];
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

  /**
   * Appends the media wysiwyg migrate processor to a field.
   *
   * @param array $migrations
   *   The aray of migrations.
   * @param string $migration_id
   *   The migration to adjust.
   * @param string $field_name
   *   The migration field name.
   *
   * @return array
   *   The updated array of migrations.
   */
  protected function appendProcessor(array $migrations, string $migration_id, string $field_name) {
    $process = $this->makeAssociative($migrations[$migration_id]['process'][$field_name]);
    $process['media_wysiwyg'] = ['plugin' => 'media_wysiwyg_filter'];
    $migrations[$migration_id]['process'][$field_name] = $process;
    return $migrations;
  }

}
