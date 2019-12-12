<?php


	if(isset($_ENV['PANTHEON_ENVIRONMENT'])) {


	} else {
		
	}


	$secretsFile = $_SERVER['HOME'] . '/files/private/secrets.json';


	if(file_exists($secretsFile)) {
		$secrets = json_decode(file_get_contents($secretsFile), 1);
	}

	if(!empty($secrets['migrate_source_db__url'])){
		$parsed_url = parse_url($secrets['migrate_source_db__url']);

	if( !empty($parsed_url['database']) && 
		!empty($parsed_url['username']) && 
		!empty($parsed_url['pass']) && 
		!empty($parsed_url['host']) && 
		!empty($parsed_url['port']) && 
		) {
		$databases['migrate']['default'] = [
		  'database' => 'pantheon',
		  'username' => 'pantheon',
		  'password' => $parsed_url['pass'],
		  'host' => $parsed_url['host'],
		  'port' => $parsed_url['port'],
		  'driver' => 'mysql',
		  'prefix' => '',
		  'collation' => 'utf8mb4_general_ci',
		];
	}
	}