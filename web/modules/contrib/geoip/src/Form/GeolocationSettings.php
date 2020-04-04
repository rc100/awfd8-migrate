<?php

namespace Drupal\geoip\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Settings form to configure GeoIP.
 */
class GeolocationSettings extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['geoip.geolocation'];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'geoip_geolocation_settings';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('geoip.geolocation');

    $form['plugin_id'] = [
      '#type' => 'tableselect',
      '#multiple' => FALSE,
      '#header' => [
        'label' => $this->t('Label'),
        'description' => $this->t('Description'),
      ],
      '#options' => [],
      '#default_value' => $config->get('plugin_id'),
    ];

    foreach (\Drupal::service('plugin.manager.geolocator')->getDefinitions() as $plugin_id => $definition) {
      $form['plugin_id']['#options'][$plugin_id] = [
        'label' => $definition['label'],
        'description' => $definition['description'],
      ];
    }

    $form['debug'] = [
      '#type' => 'radios',
      '#title' => $this->t('Enable debugging logs'),
      '#options' => [
        $this->t('No'),
        $this->t('Yes'),
      ],
      '#default_value' => (int) $config->get('debug'),
    ];

    // Container for manual lookup.
    $form['geoip_lookup'] = [
      '#type' => 'details',
      '#title' => $this->t('Manual lookup'),
      '#description' => $this->t('Use the selected plugin to manually lookup an IP address and return details about the location. You must have saved the form first if changing plugin.'),
      '#open' => TRUE,
    ];

    $form['geoip_lookup']['geoip_lookup_ip'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Manual lookup'),
      '#description' => $this->t('Enter IP address'),
    ];

    $form['geoip_lookup']['geoip_lookup_submit'] = [
      '#type' => 'button',
      '#value' => $this->t('Lookup'),
      '#suffix' => '<span id="lookup-message" class="message"></span>',
      '#ajax' => [
        'callback' => 'Drupal\geoip\Form\GeoLocationSettings::checkIp',
        'event' => 'click',
        'wrapper' => 'lookup-message',
        'method' => 'html',
        'progress' => [
          'type' => 'throbber',
          'message' => t('Checking...'),
        ],
      ],
    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * AJAX callback for looking up an IP.
   *
   * @param array $form
   *   The form itself.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The form state including the submitted values for AJAX.
   *
   * @return array
   */
  public function checkIp(array &$form, FormStateInterface $form_state) {
    /** @var \Drupal\geoip\GeoLocation $geolocation */
    $geolocation = \Drupal::service('geoip.geolocation');
    $ip = $form_state->getValue('geoip_lookup_ip');

    try {
      $country = $geolocation->geolocate($ip);
    }
    catch (\Exception $e) {
      return ['#markup' => $e->getMessage()];
    }

    $success_message = 'IP Address %ip is assigned to country code %country.';
    $failure_message = 'Country code is not available for %ip.';

    // Edge case for CDN plugin.
    // @TODO Should this be moved to the plugin?
    if ($geolocation->getGeoLocatorId() == 'cdn') {
      $success_message = 'The CDN plugin uses a HTTP session variable so you can\'t look up any IP. For your session the country code is %country.';
      $failure_message = "The CDN session variable was not available.";
    }

    $message = t((!empty($country)) ? $success_message : $failure_message, [
      '%ip' => $ip,
      '%country' => $country
    ]);
    return ['#markup' => $message];
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $this->config('geoip.geolocation')
      ->set('plugin_id', $form_state->getValue('plugin_id'))
      ->set('debug', $form_state->getValue('debug'))
      ->save();

    parent::submitForm($form, $form_state);
  }

}
