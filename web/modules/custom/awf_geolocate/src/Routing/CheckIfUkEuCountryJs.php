<?php

namespace Drupal\awf_geolocate\Routing;

use Symfony\Component\Routing\Route;

/**
 * Defines dynamic routes.
 */
class CheckIfUkEuCountryJs {

  /**
   * {@inheritdoc}
   */
  public function routes() {
    $routes = [];
    $routes['awf_geolocate.check_if_uk_eu_country_js'] = new Route(
      '/uk-eu-check',
      [
        '_controller' => '\Drupal\awf_geolocate\Controller\CheckIfUkEuCountryJsController::content',
      ],
      [
        '_permission' => 'access content',
      ]
    );
    return $routes;
  }

}
