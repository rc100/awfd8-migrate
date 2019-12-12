<?php

	isset($_ENV['PANTHEON_ENVIRONMENT']) ? $secretsFile = $_SERVER['HOME'] . '/files/private/secrets.json' : 
	$_SERVER['HOME'] . '/lando_config/secret/secrets.json';


	if( isset($_ENV['PANTHEON_ENVIRONMENT']) ){

		$secretsFile = $_SERVER['HOME'] . '/files/private/secrets.json';
		if(file_exists($secretsFile)) {
			$secrets = json_decode(file_get_contents($secretsFile), 1);
		}

		if(!empty($secrets['migrate_source_db__url'])){
			$parsed_url = parse_url($secrets['migrate_source_db__url']);

			if( !empty($parsed_url['migrate_source_db__database']) && 
				!empty($parsed_url['migrate_source_db__username']) && 
				!empty($parsed_url['migrate_source_db__pass']) && 
				!empty($parsed_url['migrate_source_db__host']) && 
				!empty($parsed_url['migrate_source_db__port']) ) {
				$databases['migrate']['default'] = [
				  'database' => $parsed_url['migrate_source_db__database'],
				  'username' => $parsed_url['migrate_source_db__username'],
				  'password' => $parsed_url['migrate_source_db__pass'],
				  'host' => $parsed_url['migrate_source_db__host'],
				  'port' => $parsed_url['migrate_source_db__port'],
				  'driver' => 'mysql',
				  'prefix' => '',
				  'collation' => 'utf8mb4_general_ci',
				];
			}
		}

	} else {
		
		$secetsFile = '/app/lando_config/secret/secrets.json';
		if(file_exists($secetsFile)) {
			$databases['migrate']['default'] = [
				'database' => 'database',
				'username' => 'mysql',
				'password' => 'mysql',
				'host' => 'legacy',
				'port' => '3306',
				'driver' => 'mysql',
				'prefix' => '',
				'collation' => 'utf8mb4_general_ci',
			];
		}
	}
