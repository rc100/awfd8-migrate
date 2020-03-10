<?php

namespace Drupal\awf_taxonomy_migration\Plugin\migrate\source;

use Drupal\Core\database\Database;
use Drupal\migrate\Row;
use Drupal\redirect\Plugin\migrate\source\d7\PathRedirect;


/**
 * 
 * @MigrateSource(
 * 	id = "asg_redirects",
 * 	source_module = "redirect"
 * )
 * 
 */

class AsgRedirects extends PathRedirect {

	public function __constructor(){

	}

	public function query() {
		\Drupal::logger('awf_taxonomy_migration')->alert('asg query hit');
		$query = $this->select('redirect', 'p')
			->fields('p')
			->condition('redirect', "%user%", 'NOT LIKE');
		return $query;
	}

	public function prepareRow(Row $row) {
		// set status code to row source
		$current_status_code = $row->getSourceProperty('status_code');
		$status_code = $current_status_code == 0 ? 302 : $current_status_code;
		$row->setSourceProperty('status_code', $status_code);

		// get current redirect
		$current_redirect = $row->getSourceProperty('redirect');
		$explode_current_redirect = explode("/", $current_redirect);

		
		$map_contents_array = array(
			'basic_page' => 'basic_page',
			'about_page' => 'about_page',
			'blog' => 'blog',
			// 'news_page',
			// 'resource_page',
			'supplemental' => 'supplemental',
			// 'species_page',

			'news' => 'news_page',
			'resouce' => 'resource_page',
			'animal' => 'species_page'		
		);

		if($explode_current_redirect[0] == 'node') {
			$resource = $this->getDatabase()
				->select('node', 'n')
				->fields('n', ['type', 'nid'])
				->condition('nid', $explode_current_redirect[1])
				->execute();
			// returns a result looking like this ['type' => 'overview_page', 'nid' => 288 ]
			$results = (array) $resource->fetch();

			if (in_array($results['type'], array_keys($map_contents_array))) {

				$new_node_id = Database::getConnection('default', 'default')
					->select('migrate_map_awf_' . $map_contents_array[$results['type']] . '_migration', 'm')
					->fields('m', ['destid1'])
					->condition('sourceid1', $explode_current_redirect[1])
					->execute()
					->fetchField();

				$new_redirect = 'node/' . $new_node_id;
				$row->setSourceProperty('redirect', $new_redirect);
			} else {

				// get source nid
				// $results['nid'];

				// entity lookup using source nid against legacy field
				$entitiesList = $this->get_legacy_field();

				$legacy_id = $entitiesList[$results['nid']];

				$legacy_id = 'node/' . $legacy_id;
				$row->setSourceProperty('redirect', $legacy_id);

			}
		}
	}

	private function get_legacy_field() {

		$legacy = [];

		$entityIds = \Drupal::entityQuery('node')
			->condition('status', 1)
			// ->condition('type', 'supplemental')
			->execute();

		$nodes = \Drupal::entityTypeManager()->getStorage('node')->loadMultiple($entityIds);
		
		foreach ($nodes as $node) {
			
			if ($node->hasField('field_legacy_id')){
				$this->get_value($node, $legacy, 'field_legacy_id');
			
			} elseif ($node->hasField('field_article_legacy_id')) {
				$this->get_value($node, $legacy, 'field_article_legacy_id');
			
			} elseif($node->hasField('field_basic_page_legacy_id')) {
				$this->get_value($node, $legacy, 'field_basic_page_legacy_id');
			
			} 

		}

		return $legacy;
	}

	private function get_value(&$node, &$legacy, $field_name = 'field_legacy_id') {
		if( !empty( $node->get( $field_name )->getValue() ) ) {
			
			$val = $node->get($field_name)->getValue();
			$legacy[$val[0]['value']] = $node->id();

		} else {
			// write or print missing legacy IDs to file
		}
	}

}