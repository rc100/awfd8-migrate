<?php

namespace Drupal\awf_taxonomy_migration\Plugin\migrate\process;

use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\MigrateException;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\Row;

/**
 * @MigrateProcessPlugin(
 *	id = "asg_views_map"
 * )
**/

class AsgViewsMap extends ProcessPluginBase {

	public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property){

		if(preg_match('/^views:([a-zA-Z_]+)[-]([a-zA-Z])/', $value['moddelta'])){

			$value = $value['moddelta'];

			if(!isset($value)){
				\Drupal::logger('awf_taxonomy_migration')->alert('ASG - Mapping - array - failed to set');
			}

			$view = substr($value, 6, strpos($value, '-') - 6);
			$block = substr($value, strpos($value, '-') + 1);
			
			$mapped = $this->map($view, $block);

		}  else {

			\Drupal::logger('awf_taxonomy_migration')->alert('ASG - Mapping - preg_match failed - ' . implode(', ', $value));

		}
		
		return $mapped ? $mapped : $value;

	}

	private function map($view, $block) {

		// map changes to view ids
		switch ($view) {
			case 'galleries':
				$view = 'galleries_file';
				break;

			case 'terms':
				$view = 'blog_terms';
				break;

			case 'in_the_field':
				// The display_ids for in_the_field view are screwed up. Just go with it.
				$view = 'in_the_field';
				
				switch ($block) {
					case 'sidebar':
						$block = 'block_1';
						return [ 'target_id' => $view, 'display_id' => $block ];
						break;

					case 'sidebar_1':
						$block = 'block_4';
						return [ 'target_id' => $view, 'display_id' => $block ];
						break;

					case 'sidebar_overview':
						$block = 'block_5';
						return [ 'target_id' => $view, 'display_id' => $block ];
						break;

					default:
						break;
				}
				break;
			
			default:
				break;
		}

		// map changes to block ids
		switch ($block) {
			case 'block':
				$block = 'block_1';
				break;

			case 'block_1':
				$block = 'block_2';
				break;

			case 'block_2':
				$block = 'block_3';
				break;

			case 'block_3':
				$block = 'block_4';
				break;

			case 'block_4':
				$block = 'block_5';
				break;

			case 'block_5':
				$block = 'block_6';
				break;

			case 'block_6':
				$block = 'block_7';
				break;

			case 'block_7':
				$block = 'block_8';
				break;

			case 'block_8':
				$block = 'block_9';
				break;

			case 'references_1'
				$block = 'entity_reference_1';
				break;

			default:
			
				break;
		}

		return [
			'target_id'	=> $view,
			'display_id' => $block
		];


	}

}


