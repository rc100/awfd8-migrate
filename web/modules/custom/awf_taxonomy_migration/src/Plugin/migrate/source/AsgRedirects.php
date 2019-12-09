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
			'basic_page',
			'about_page',
			'blog',
			'news'
		);

		if($explode_current_redirect[0] == 'node') {
			$resource_type = $this->getDatabase()
				->select('node', 'n')
				->fields('n', ['type'])
				->condition('nid', $explode_current_redirect[1])
				->execute()
				->fetchField();
		
			if (in_array($resource_type, $map_contents_array)) {

				$new_node_id = Database::getConnection('default', 'default')
					->select('migrate_map_awf_' . $resource_type . '_migration', 'm')
					->fields('m', ['destid1'])
					->condition('sourceid1', $explode_current_redirect[1])
					->execute()
					->fetchField();

				$new_redirect = 'node/' . $new_node_id;
				$row->setSourceProperty('redirect', $new_redirect);
			} 
		}
	}

}