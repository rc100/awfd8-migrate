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
$config_directories = array(
  CONFIG_SYNC_DIRECTORY => dirname(DRUPAL_ROOT) . '/config',
);

/**
 * If there is a local settings file, then include it
 */
$local_settings = __DIR__ . "/settings.local.php";
if (file_exists($local_settings)) {
  include $local_settings;
}

/**
 * Always install the 'standard' profile to stop the installer from
 * modifying settings.php.
 */
$settings['install_profile'] = 'standard';
// $databases['default']['default'] = array (
//   'database' => 'drupal8',
//   'username' => 'drupal8',
//   'password' => 'drupal8',
//   'prefix' => '',
//   'host' => 'database',
//   'port' => '3306',
//   'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
//   'driver' => 'mysql',
// );
// $settings['hash_salt'] = 'AUxfgneL8NBZT1newes4MsVwFtgMvX9WiNRreVNxJZgK19g6Lpx5nvgDzJs5zg_aTJZYhyuoiQ';
