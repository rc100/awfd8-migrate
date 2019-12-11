<?php

$databases['migrate']['default'] = [
  'database' => 'pantheon',
  'username' => 'pantheon',
  'password' => '6c0f0d2fb8cf439ca53a0ff8575d74cd',
  'host' => 'dbserver.dev.f63864b1-bfdc-4396-aac2-63761eec5fdc.drush.in',
  'port' => '24915',
  'driver' => 'mysql',
  'prefix' => '',
  'collation' => 'utf8mb4_general_ci',
];

// $databases['migrate']['default'] = [
//   'database' => 'database',
//   'username' => 'mysql',
//   'password' => 'mysql',
//   'host' => 'legacy',
//   'port' => '3306',
//   'driver' => 'mysql',
//   'prefix' => '',
//   'collation' => 'utf8mb4_general_ci',
// ];

// mysql -u pantheon -p6c0f0d2fb8cf439ca53a0ff8575d74cd -h dbserver.dev.f63864b1-bfdc-4396-aac2-63761eec5fdc.drush.in -P 24915 pantheon
