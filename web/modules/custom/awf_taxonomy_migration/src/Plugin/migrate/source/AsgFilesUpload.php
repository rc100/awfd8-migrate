<?php

namespace Drupal\awf_taxonomy_migration\Plugin\migrate\source;

use Drupal\migrate\Plugin\migrate\source\SqlBase;
use Drupal\migrate\Row;


/**
 * 
 * @MigrateSource(
 * 	id = "d7_file_asg",
 * 	source_module = "file_entity"
 * )
 */

class AsgFilesUpload extends SqlBase {

	public function fields(){
		$fields = array(
			'fid',
			'filename',
			'uri',
			'filepath',
			'filemime'
		);
		return $fields;
	}

	public function prepareRow(Row $row){
		
		$filename = $row->getSourceProperty('filename');
		//  isset($_ENV['PANTHEON_ENVIRONMENT'])
		if(  true  ){
			$sitepath = 'https://d7-legacy-awf-website.pantheonsite.io/sites/default/files';
		} else {
			$sitepath = $_SERVER['DOCUMENT_ROOT'] . '/web/sites/default/files';
		}
		
		$filename = $sitepath . $filename;
		$row->setSourceProperty('uri', $row->getSourceProperty('uri'));
		$row->setSourceProperty('filepath', $filename);
		return parent::prepareRow($row);
	}

	public function getIds() {
		return array(
			'fid' => [
				'type' => 'integer',
				'alias' => 'fm'
			]
		);
	}

	public function query() {
		$query = $this->select('file_managed', 'fm')
			->fields('fm')
			->distinct()
			->orderBy('fid');
		return $query;
	}

}