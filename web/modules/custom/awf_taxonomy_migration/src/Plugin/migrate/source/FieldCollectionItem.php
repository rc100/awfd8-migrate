<?php

namespace Drupal\awf_taxonomy_migration\Plugin\migrate\source;

use Drupal\migrate\Row;
use Drupal\migrate_drupal\Plugin\migrate\source\d7\FieldableEntity;


/**
 * Drupal 7 field_collection_item source from database.
 *
 * @MigrateSource(
 *   id = "d7_field_collection_item_asg",
 *   source_module = "field_collection"
 * )
 */
class FieldCollectionItem extends FieldableEntity {
  /**
   * {@inheritdoc}
   */
  public function query() {
    // Select node in its last revision.
    // select * from field_collection_item fci join field_data_field_description fdfd on fci.item_id = fdfd.entity_id where fci.field_name = 'field_module' \G

    // select fci.item_id, fci.revision_id, fci.field_name, fci.archived, fd.entity_type, fd.bundle, fd.entity_id from field_collection_item fci Inner Join field_data_field_module fd on fd.field_module_value = fci.item_id \G
    $query = $this->select('field_collection_item', 'fci')
      ->fields('fci', [
        'item_id',
        'revision_id',
        'field_name',
        'archived',
      ]);
    if (isset($this->configuration['field_name'])) {
        // \Drupal::logger('awf_taxonomy_migration')->alert('asg config - ' . $this->configuration['field_name']);
      $query->innerJoin('field_data_' . $this->configuration['field_name'], 'fd', 'fd.' . $this->configuration['field_name'] . '_value = fci.item_id');
      $query->fields('fd', [
        'entity_type',
        'bundle',
        'entity_id',
        $this->configuration['field_name'] . '_revision_id',
      ]);
      $query->condition('fci.field_name', $this->configuration['field_name']);
    
    } else {
           \Drupal::logger('awf_taxonomy_migration')->alert('asg config - no config');
    }

    return $query;
  }
  /**
   * {@inheritdoc}
   */
  public function prepareRow(Row $row) {
    // If field specified, get field revision ID so there aren't issues mapping.
    if (isset($this->configuration['field_name'])) {
      // $row->setSourceProperty('revision_id', $row->getSourceProperty($this->configuration['field_name'] . '_revision_id'));
    }
    // Get Field API field values.
    foreach (array_keys($this->getFields('field_collection_item', $row->getSourceProperty('field_name'))) as $field) {
      $item_id = $row->getSourceProperty('item_id');
      $revision_id = $row->getSourceProperty('revision_id');
      $row->setSourceProperty($field, $this->getFieldValues('field_collection_item', $field, $item_id, $revision_id));
    }
    return parent::prepareRow($row);
  }
  /**
   * {@inheritdoc}
   */
  public function fields() {
    $fields = [
      'item_id' => $this->t('Item ID'),
      'revision_id' => $this->t('Revision ID'),
      'field_name' => $this->t('Name of field'),
      'entity_type' => $this->t('Host entity type'),
      'entity_id' => $this->t('Host entity ID'),
    ];
    return $fields;
  }
  /**
   * {@inheritdoc}
   */
  public function getIds() {
    $ids['item_id']['type'] = 'integer';
    $ids['item_id']['alias'] = 'fci';
    return $ids;
  }
}