<?php

namespace Drupal\awf_taxonomy_migration\Plugin\migrate\source;

use Drupal\migrate\Row;
use Drupal\node\Plugin\migrate\source\d7\Node as D7Node;


/**
 * 
 * @MigrateSource(
 * 		id = "custom_node_source",
 * 		source_module = "node"
 * )
 * 
 */


class Node extends D7Node {

	public function fields(){
		return ['alias' => $this->t('Path alias')] + parent::fields();
	}


	public function prepareRow(Row $row) {
		$nid = $row->getSourceProperty('nid');
		$query = $this->select('url_alias','ua')->fields('ua', ['alias']);
		$query->condition('ua.source', 'node/'  . $nid);
		$alias = $query->execute()->fetchfield();

		if(!empty($alias)) {
			$row->setSourceProperty('alias', '/' . $alias);
		} else {
			$row->setSourceProperty('alias', '/unknown');
		}

		return parent::prepareRow($row);

	}


}