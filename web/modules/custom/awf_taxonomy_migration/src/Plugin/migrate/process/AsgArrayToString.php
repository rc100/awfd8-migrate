<?php

namespace Drupal\awf_taxonomy_migration\Plugin\migrate\process;

use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\MigrateException;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\Row;

/**
 * @MigrateProcessPlugin(
 *	id = "asg_array_to_string"
 * 
 * )
**/

class AsgArrayToString extends ProcessPluginBase {

	public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property){

		if(is_array($value)){
			\Drupal::logger('awf_taxonomy_migration')->alert('asg - array - ' . implode(', ', $value));
			return $value[0];
		} else {
			\Drupal::logger('awf_taxonomy_migration')->alert('asg - string - ' . $value);
			return $value;
		}

	}

}
