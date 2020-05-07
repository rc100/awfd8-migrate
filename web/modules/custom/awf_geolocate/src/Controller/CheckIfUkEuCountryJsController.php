<?php

namespace Drupal\awf_geolocate\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Controller for JS call that checks if the visitor is in the UK or EU.
 */
class CheckIfUkEuCountryJsController extends ControllerBase {

  /**
   * {@inheritdoc}
   */
  public function content() {
    $data = awf_geolocate_user_in_uk_eu();

    // Allow other modules to alter the geo IP matching logic.
    //\Drupal::moduleHandler()->alter('awf_geolocate_geoip_match', $data);

    return new JsonResponse($data, 200, ['Cache-Control' => 'private']);
  }

}
