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
    	      0 => 'devawf-awfd8-sandbox.pantheonsite.io',
            1 => 'dev-awfd8-sandbox.pantheonsite.io',
            2 => 'test-awfd8-sandbox.pantheonsite.io',
            3 => 'dev.awf.org',
            4 => 'test.awf.org'
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

  // Force redirects just on live site

	if (isset($variables)) {
    if (isset($variables['domains']['canonical'])) {

      $location = false;

      // Get current protocol
      $protocol = 'http';

      if (array_key_exists('https', $variables) && $variables['https']) {
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

      switch($_SERVER['REQUEST_URI']) {
        case  '/content/heartland/detail':
          $redirect = "$protocol://{$variables['domains']['canonical']}/where-we-work";
          break;
        case '/wildlives':
          $redirect = "$protocol://{$variables['domains']['canonical']}/wildlife-conservation/all";
          break;
        case '/documents':
          $redirect = "$protocol://{$variables['domains']['canonical']}/about/resources";
          break;
        case '/section/engaging_you':
          $redirect = "$protocol://{$variables['domains']['canonical']}/donate";
          break;
        case '/heartlands':
          $redirect = "$protocol://{$variables['domains']['canonical']}/where-we-work";
          break;
        case '/section/wildlife':
          $redirect = "$protocol://{$variables['domains']['canonical']}/wildlife-conservation/all";
          break;
        case '/storybook':
          $redirect = "$protocol://{$variables['domains']['canonical']}/landing/2013/10/storybook/";
          break;
        case  '/content/heartland/detail/':
          $redirect = "$protocol://{$variables['domains']['canonical']}/where-we-work";
          break;
        case '/wildlives/':
          $redirect = "$protocol://{$variables['domains']['canonical']}/wildlife-conservation/all";
          break;
        case '/documents/':
          $redirect = "$protocol://{$variables['domains']['canonical']}/about/resources";
          break;
        case '/section/engaging_you/':
          $redirect = "$protocol://{$variables['domains']['canonical']}/donate";
          break;
        case '/heartlands/':
          $redirect = "$protocol://{$variables['domains']['canonical']}/where-we-work";
          break;
        case '/section/wildlife/':
          $redirect = "$protocol://{$variables['domains']['canonical']}/wildlife-conservation/all";
          break;
        case '/storybook/':
          $redirect = "$protocol://{$variables['domains']['canonical']}/landing/2013/10/storybook/";
          break;
        case '/campaigns/1503-calendar-landing':
          $redirect = "https://campaign.awf.org/1503-calendar-landing/";
          break;
        case '/campaigns/1604-calendar-landing':
          $redirect = "https://campaign.awf.org/1604-calendar-landing/";
          break;
        case '/campaigns/1704-calendar-landing':
          $redirect = "https://campaign.awf.org/1704-calendar-landing/";
          break;
        case '/campaigns/1804-calendar-landing':
          $redirect = "https://campaign.awf.org/1804-calendar-landing/";
          break;
        case '/campaigns/calendar-voting':
          $redirect = "https://campaign.awf.org/calendar-voting/";
          break;
        case '/campaigns/classroom-africa-challenge':
          $redirect = "https://campaign.awf.org/classroom-africa-challenge/";
          break;
        case '/campaigns/conservation-canines':
          $redirect = "https://campaign.awf.org/conservation-canines/";
          break;
        case '/campaigns/countingelephants':
          $redirect = "https://campaign.awf.org/countingelephants/";
          break;
        case '/campaigns/dogs-saving-elephants':
          $redirect = "https://campaign.awf.org/dogs-saving-elephants/";
          break;
        case '/campaigns/enews':
          $redirect = "https://campaign.awf.org/enews/";
          break;
        case '/campaigns/herded-to-extinction':
          $redirect = "https://campaign.awf.org/herded-to-extinction/";
          break;
        case '/campaigns/lion-poaching':
          $redirect = "https://campaign.awf.org/lion-poaching/";
          break;
        case '/campaigns/modern-poaching':
          $redirect = "https://campaign.awf.org/modern-poaching/";
          break;
        case '/campaigns/pledge':
          $redirect = "https://secure.awf.org/campaigns/pledge";
          break;
        case '/campaigns/poaching-deaths-visualized':
          $redirect = "https://campaign.awf.org/poaching-deaths-visualized/";
          break;
        case '/campaigns/poaching-infographic':
          $redirect = "https://campaign.awf.org/poaching-infographic/";
          break;
        case '/campaigns/poachingquiz':
          $redirect = "https://campaign.awf.org/poachingquiz/";
          break;
        case '/campaigns/safari-sweepstakes':
          $redirect = "https://campaign.awf.org/safari-sweepstakes/";
          break;
        case '/campaigns/selective-sympathy':
          $redirect = "https://campaign.awf.org/selective-sympathy/";
          break;
        case '/campaigns/spirit-animal-quiz':
          $redirect = "https://campaign.awf.org/spirit-animal-quiz/";
          break;
        case '/campaigns/stop-oil-exploration-in-virunga':
          $redirect = "https://campaign.awf.org/stop-oil-exploration-in-virunga/";
          break;
        case '/campaigns/storybook':
          $redirect = "https://campaign.awf.org/storybook/";
          break;
        case '/campaigns/storybook-2015':
          $redirect = "https://campaign.awf.org/storybook-2015/";
          break;
        case '/campaigns/storybook-natures-best':
          $redirect = "https://campaign.awf.org/storybook-natures-best/";
          break;
        case '/campaigns/support-african-elephants':
          $redirect = "https://campaign.awf.org/support-african-elephants";
          break;
        case '/campaigns/support-african-elephants-care2':
          $redirect = "https://campaign.awf.org/support-african-elephants-care2/";
          break;
        case '/campaigns/support-african-elephants-quantcast':
          $redirect = "https://campaign.awf.org/support-african-elephants-quantcast/";
          break;
        case '/campaigns/support-african-lions':
          $redirect = "https://campaign.awf.org/support-african-lions/";
          break;
        case '/campaigns/thank-you':
          $redirect = "https://campaign.awf.org/thank-you/";
          break;
        case '/campaigns/wildlife-footprint':
          $redirect = "https://campaign.awf.org/wildlife-footprint/";
          break;
        case '/campaigns/wildlife-hero':
          $redirect = "https://campaign.awf.org/wildlife-hero/";
          break;
        case '/campaigns/wildlife-trade-and-seizure-maps':
          $redirect = "https://campaign.awf.org/wildlife-trade-and-seizure-maps/";
          break;
        case '/campaigns/years-of-living-dangerously':
          $redirect = "https://campaign.awf.org/years-of-living-dangerously/";
          break;
        case '/campaigns/1503-calendar-landing/':
          $redirect = "https://campaign.awf.org/1503-calendar-landing/";
          break;
        case '/campaigns/1604-calendar-landing/':
          $redirect = "https://campaign.awf.org/1604-calendar-landing/";
          break;
        case '/campaigns/1704-calendar-landing/':
          $redirect = "https://campaign.awf.org/1704-calendar-landing/";
          break;
        case '/campaigns/1804-calendar-landing/':
          $redirect = "https://campaign.awf.org/1804-calendar-landing/";
          break;
        case '/campaigns/calendar-voting/':
          $redirect = "https://campaign.awf.org/calendar-voting/";
          break;
        case '/campaigns/classroom-africa-challenge/':
          $redirect = "https://campaign.awf.org/classroom-africa-challenge/";
          break;
        case '/campaigns/conservation-canines/':
          $redirect = "https://campaign.awf.org/conservation-canines/";
          break;
        case '/campaigns/countingelephants/':
          $redirect = "https://campaign.awf.org/countingelephants/";
          break;
        case '/campaigns/dogs-saving-elephants/':
          $redirect = "https://campaign.awf.org/dogs-saving-elephants/";
          break;
        case '/campaigns/enews/':
          $redirect = "https://campaign.awf.org/enews/";
          break;
        case '/campaigns/herded-to-extinction/':
          $redirect = "https://campaign.awf.org/herded-to-extinction/";
          break;
        case '/campaigns/lion-poaching/':
          $redirect = "https://campaign.awf.org/lion-poaching/";
          break;
        case '/campaigns/modern-poaching/':
          $redirect = "https://campaign.awf.org/modern-poaching/";
          break;
        case '/campaigns/pledge/':
          $redirect = "https://secure.awf.org/campaigns/pledge";
          break;
        case '/campaigns/poaching-deaths-visualized/':
          $redirect = "https://campaign.awf.org/poaching-deaths-visualized/";
          break;
        case '/campaigns/poaching-infographic/':
          $redirect = "https://campaign.awf.org/poaching-infographic/";
          break;
        case '/campaigns/poachingquiz/':
          $redirect = "https://campaign.awf.org/poachingquiz/";
          break;
        case '/campaigns/safari-sweepstakes/':
          $redirect = "https://campaign.awf.org/safari-sweepstakes/";
          break;
        case '/campaigns/selective-sympathy/':
          $redirect = "https://campaign.awf.org/selective-sympathy/";
          break;
        case '/campaigns/spirit-animal-quiz/':
          $redirect = "https://campaign.awf.org/spirit-animal-quiz/";
          break;
        case '/campaigns/stop-oil-exploration-in-virunga/':
          $redirect = "https://campaign.awf.org/stop-oil-exploration-in-virunga/";
          break;
        case '/campaigns/storybook/':
          $redirect = "https://campaign.awf.org/storybook/";
          break;
        case '/campaigns/storybook-2015/':
          $redirect = "https://campaign.awf.org/storybook-2015/";
          break;
        case '/campaigns/storybook-natures-best/':
          $redirect = "https://campaign.awf.org/storybook-natures-best/";
          break;
        case '/campaigns/support-african-elephants/':
          $redirect = "https://campaign.awf.org/support-african-elephants";
          break;
        case '/campaigns/support-african-elephants-care2/':
          $redirect = "https://campaign.awf.org/support-african-elephants-care2/";
          break;
        case '/campaigns/support-african-elephants-quantcast/':
          $redirect = "https://campaign.awf.org/support-african-elephants-quantcast/";
          break;
        case '/campaigns/support-african-lions/':
          $redirect = "https://campaign.awf.org/support-african-lions/";
          break;
        case '/campaigns/thank-you/':
          $redirect = "https://campaign.awf.org/thank-you/";
          break;
        case '/campaigns/wildlife-footprint/':
          $redirect = "https://campaign.awf.org/wildlife-footprint/";
          break;
        case '/campaigns/wildlife-hero/':
          $redirect = "https://campaign.awf.org/wildlife-hero/";
          break;
        case '/campaigns/wildlife-trade-and-seizure-maps/':
          $redirect = "https://campaign.awf.org/wildlife-trade-and-seizure-maps/";
          break;
        case '/campaigns/years-of-living-dangerously/':
          $redirect = "https://campaign.awf.org/years-of-living-dangerously/";
          break;
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

  // if (PANTHEON_ENVIRONMENT == 'dev') {

  // }

  // if (PANTHEON_ENVIRONMENT == 'test') {
  //   // Place for settings for the test environment
  // }
  // if (PANTHEON_ENVIRONMENT == 'live') {
  //   // Place for settings for the live environment

  //   // Redirect to canonical domain
  // }

}

