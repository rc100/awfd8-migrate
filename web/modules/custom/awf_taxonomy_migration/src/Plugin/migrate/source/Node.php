<?php

namespace Drupal\awf_taxonomy_migration\Plugin\migrate\source;

use Drupal\migrate\Row;
use Drupal\node\Plugin\migrate\source\d7\Node as D7Node;


/**
 * 
 * @MigrateSource(
 * 		id = "asg_node_source",
 * 		source_module = "node"
 * )
 * 
 */


class Node extends D7Node {

	public function fields(){
		return [
			'alias' => $this->t('Path alias'),
			'metatags' => $this->t('Meta Tags'),
		] + parent::fields();
	}


	public function prepareRow(Row $row) {
		$nid = $row->getSourceProperty('nid');
		$vid = $row->getSourceProperty('vid');
		$query = $this->select('url_alias','ua')->fields('ua', ['alias']);
		$query->condition('ua.source', 'node/'  . $nid);
		$alias = $query->execute()->fetchfield();

		if(!empty($alias)) {
			$row->setSourceProperty('alias', '/' . $alias);
		} else {
			$row->setSourceProperty('alias', '/unknown');
		}

		// get metatags from table by id
		$query = null;
		$query = $this->select('metatag', 'mt')
			->fields('mt', ['data'])
			->condition('mt.entity_id', $nid)
			->condition('mt.revision_id', $vid)
			->execute();
		$results = $query->fetchfield();

		// set metatags to row
		if(!empty($results)) {

			// unserialize to read values
			$resultsArray = unserialize($results);
			$newResults = [];

			// Map the old metatag names to the new d8 ones
			$map = $this->metaTagsMap();
			foreach($resultsArray as $resultKey => $resultValue) {

				if(is_array($resultValue)){
					$resultValue = implode(', ', $resultValue);
				}

				if (!empty($map[$resultKey])) {
					$newResults[$map[$resultKey]] = $resultValue;
				}
			}

			// Researialize to for D8 and save
			$returnValue = serialize($newResults);
			$row->setSourceProperty('metatags', $returnValue);
		}


		return parent::prepareRow($row);

	}

		// mapp the old metatag names to the new ones
	public function metaTagsMap(){
		$map = [
			// From the main Metatag module.
			'abstract' => 'abstract',
			'canonical' => 'canonical_url',
			'content-language' => 'content_language',
			'description' => 'description',
			'generator' => 'generator',
			'geo.placename' => 'geo_placename',
			'geo.position' => 'geo_position',
			'geo.region' => 'geo_region',
			'icbm' => 'icbm',
			'image_src' => 'image_src',
			'keywords' => 'keywords',
			'news_keywords' => 'news_keywords',
			'original-source' => 'original_source',
			'rating' => 'rating',
			'referrer' => 'referrer',
			'rights' => 'rights',
			'robots' => 'robots',
			'set_cookie' => 'set_cookie',
			'shortlink' => 'shortlink',
			'standout' => 'standout',
			'title' => 'title',

			// From metatag_facebook.metatag.inc:
			'fb:admins' => 'fb_admins',
			'fb:app_id' => 'fb_app_id',
			'fb:pages' => 'fb_pages',

			// From metatag_opengraph.metatag.inc:
			'article:author' => 'article_author',
			'article:expiration_time' => 'article_expiration_time',
			'article:modified_time' => 'article_modified_time',
			'article:published_time' => 'article_published_time',
			'article:publisher' => 'article_publisher',
			'article:section' => 'article_section',
			'article:tag' => 'article_tag',
			'book:author' => 'book_author',
			'book:isbn' => 'book_isbn',
			'book:release_date' => 'book_release_date',
			'book:tag' => 'book_tag',
			'og:country_name' => 'og_country_name',
			'og:description' => 'og_description',
			'og:determiner' => 'og_determiner',
			'og:email' => 'og_email',
			'og:fax_number' => 'og_fax_number',
			'og:image' => 'og_image',
			'og:image:height' => 'og_image_height',
			'og:image:secure_url' => 'og_image_secure_url',
			'og:image:type' => 'og_image_type',
			'og:image:url' => 'og_image_url',
			'og:image:width' => 'og_image_width',
			'og:latitude' => 'og_latitude',
			'og:locale' => 'og_locale',
			'og:locale:alternate' => 'og_locale_alternative',
			'og:locality' => 'og_locality',
			'og:longitude' => 'og_longitude',
			'og:phone_number' => 'og_phone_number',
			'og:postal_code' => 'og_postal_code',
			'og:region' => 'og_region',
			'og:see_also' => 'og_see_also',
			'og:site_name' => 'og_site_name',
			'og:street_address' => 'og_street_address',
			'og:title' => 'og_title',
			'og:type' => 'og_type',
			'og:updated_time' => 'og_updated_time',
			'og:url' => 'og_url',
			'og:video:height' => 'og_video_height',
			'og:video:secure_url' => 'og_video_secure_url',
			'og:video:type' => 'og_video_type',
			'og:video:url' => 'og_video_url',
			'og:video:width' => 'og_video_width',

			// From metatag_opengraph_products.metatag.inc: just incase...
			'product:price:amount' => 'product_price_amount',
			'product:price:currency' => 'product_price_currency',			
		];

      return $map;

	}


}