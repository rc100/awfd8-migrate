<?php

	if( isset($_ENV['PANTHEON_ENVIRONMENT']) ){

		$secretsFile = $_SERVER['HOME'] . '/files/private/secrets.json';
		if(file_exists($secretsFile)) {
			$secrets = json_decode(file_get_contents($secretsFile), TRUE);
		}

		if( !empty($secrets['migrate_source_db__database']) && 
			!empty($secrets['migrate_source_db__username']) && 
			!empty($secrets['migrate_source_db__pass']) && 
			!empty($secrets['migrate_source_db__host']) && 
			!empty($secrets['migrate_source_db__port']) ) {
			$databases['migrate']['default'] = [
			  'database' => $secrets['migrate_source_db__database'],
			  'username' => $secrets['migrate_source_db__username'],
			  'password' => $secrets['migrate_source_db__pass'],
			  'host' => $secrets['migrate_source_db__host'],
			  'port' => $secrets['migrate_source_db__port'],
			  'driver' => 'mysql',
			  'prefix' => '',
			  'collation' => 'utf8mb4_general_ci',
			];
		}

	} else {
		
		$secetsFile = '/app/lando_config/secret/secrets.json';
		if(file_exists($secetsFile)) {
			// $databases['migrate']['default'] = [
			// 	'database' => 'database',
			// 	'username' => 'mysql',
			// 	'password' => 'mysql',
			// 	'host' => 'legacy',
			// 	'port' => '3306',
			// 	'driver' => 'mysql',
			// 	'prefix' => '',
			// 	'collation' => 'utf8mb4_general_ci',
			// ];
			$databases['migrate']['default'] = [
				'database' => 'drupal7',
				'username' => 'drupal7',
				'password' => 'drupal7',
				'host' => '162.241.224.59',
				'port' => '32824',
				'driver' => 'mysql',
				'prefix' => '',
				'collation' => 'utf8mb4_general_ci',
			];
		}
	}
