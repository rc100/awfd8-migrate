<?php

namespace Drupal\awf_taxonomy_migration\Plugin\migrate\process;

use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\MigrateException;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\Row;

/**
 * @MigrateProcessPlugin(
 *	id = "asg_reset_keys"
 * )
**/

class AsgResetKeys extends ProcessPluginBase {

	public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property){

		if(is_array($value)){

			$new_array = [];

			foreach ($value as $val) {
				$new_array[] = $val;
			}

			$value = NULL;
			$value = $new_array;
		}

		return $value;

	}

}
