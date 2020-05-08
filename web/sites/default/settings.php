<?php

/**
 * Load services definition file.
 */
$settings['container_yamls'][] = __DIR__ . '/services.yml';

/**
 * Include the Pantheon-specific settings file.
 *
 * n.b. The settings.pantheon.php file makes some changes
 *      that affect all environments that this site
 *      exists in.  Always include this file, even in
 *      a local development environment, to ensure that
 *      the site settings remain consistent.
 */
include __DIR__ . "/settings.pantheon.php";

/**
 * Place the config directory outside of the Drupal root.
 */

// $settings['config_sync_directory'] = dirname(DRUPAL_ROOT) . '/web/sites/default/config';

$settings['config_sync_directory'] = dirname(DRUPAL_ROOT) . '/config';

/**
 * If there is a local settings file, then include it
 */
$local_settings = __DIR__ . "/settings.local.php";
if (file_exists($local_settings)) {
  include $local_settings;
}



$cli = (php_sapi_name() === 'cli');

 /**
 * Pantheon-specific settings
 */

if (defined('PANTHEON_ENVIRONMENT')) {
		
  $variables = array (
	  'https' => true,
	  'domains' => 
	  array (
	    'canonical' => 'www.awf.org',
	    'synonyms' => 
	    array (
	      0 => 'devawf-awfd8-sandbox.pantheonsite.io'
	    ),
	    'additional' => 
	    array (
	      0 => 'awf.org',
	    ),
	  ),
	  'redis' => false,
	);

	// Extract Pantheon environmental configuration.
	extract(json_decode($_SERVER['PRESSFLOW_SETTINGS'], TRUE));

  if (PANTHEON_ENVIRONMENT != 'live') {
    // Place for settings for the non-live environment

  	if (isset($variables)) {
      if (isset($variables['domains']['canonical'])) {
        if (!$cli) {
          $location = false;

          // Get current protocol
          $protocol = 'https';

          if (aray_key_exists('https', $variables) && $variables['https']) {
            if ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || $_SERVER['SERVER_PORT'] == 443) {
              $protocol = 'https';
            }
          }

          // Default redirect
          $redirect = "$protocol://{$variables['domains']['canonical']}{$_SERVER['REQUEST_URI']}";

          if ($_SERVER['HTTP_HOST'] == $variables['domains']['canonical']) {
            $redirect = false;
          }

          if (isset($variables['domains']['synonyms']) && is_array($variables['domains']['synonyms'])) {
            if (in_array($_SERVER['HTTP_HOST'], $variables['domains']['synonyms'])) {
              $redirect = false;
            }
          }

          if (strpos($_SERVER['REQUEST_URI'], '/blog/wp-content/uploads/') !== FALSE) {
            $_SERVER['REQUEST_URI'] = str_replace('/blog/wp-content/uploads/','/sites/default/files/pictures/',$_SERVER['REQUEST_URI']);
            $redirect = "$protocol://{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}"; 
          }

          if ($redirect) {
            header("HTTP/1.0 301 Moved Permanently");
            header("Location: $redirect");
            exit();
          }
        }
      }
    }


  }

  if (PANTHEON_ENVIRONMENT == 'dev') {

  }

  if (PANTHEON_ENVIRONMENT == 'test') {
    // Place for settings for the test environment
  }
  if (PANTHEON_ENVIRONMENT == 'live') {
    // Place for settings for the live environment

    // Redirect to canonical domain
  }




}

