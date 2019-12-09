<?php

namespace Drupal\media_migration\Plugin\MediaWysiwyg;

use Drupal\media_migration\MediaWysiwygPluginBase;
use Drupal\migrate\Row;

/**
 * Node Media WYSIWYG plugin.
 *
 * @MediaWysiwyg(
 *   id = "node",
 *   label = @Translation("Node"),
 *   description = @Translation("Node plugin.")
 * )
 */
class Node extends MediaWysiwygPluginBase {

  /**
   * {@inheritdoc}
   */
  public function process(array $migrations, Row $row) {
    foreach (['d7_node', 'd7_node_revision'] as $migration_id) {
      $derived_migration = $migration_id . ':' . $row->getSourceProperty('bundle');
      if (isset($migrations[$derived_migration])) {
        $migrations = $this->appendProcessor($migrations, $derived_migration, $row->getSourceProperty('field_name'));
      }
    }

    return $migrations;
  }

}
