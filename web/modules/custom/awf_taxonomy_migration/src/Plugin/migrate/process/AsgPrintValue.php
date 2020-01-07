<?php

namespace Drupal\awf_taxonomy_migration\Plugin\migrate\process;

use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\MigrateException;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\Row;

/**
 * @MigrateProcessPlugin(
 *	id = "asg_print"
 * 
 * )
**/

class AsgPrintValue extends ProcessPluginBase {

	public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property){

		if(is_array($value)){

			$keys = array_keys($value);

			\Drupal::logger('awf_taxonomy_migration')->alert('asg - array - keys=['. implode(', ', $keys) .'] values=[' . implode(', ', $value) . ']');
		} else {
			\Drupal::logger('awf_taxonomy_migration')->alert('asg - string - ' . $value);
		}
		 
		 // \Drupal::logger('awf_taxonomy_migration')->alert('asg migration found / triggered. v6');

		return $value;

	}

}
