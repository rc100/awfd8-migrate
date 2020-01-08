<?php

namespace Drupal\awf_taxonomy_migration\Plugin\migrate\source;

use Drupal\migrate\Row;
use Drupal\migrate\Plugin\migrate\source\SqlBase;
use Drupal\migrate_drupal\Plugin\migrate\source\DrupalSqlBase;



/**
 * @Code    drush ev "print_r(\Drupal::service('plugin.manager.migrate.source')->getDefinitions())"
 * @MigrateSource(
 * 	id = "asg_user",
 * 	source_module = "user",
 * )
 * 
 */
class AsgUsers extends DrupalSqlBase {

	public function query(){
		$keys = array_keys($this->baseFields());
		// array_push($keys, 'user_picture');
		return $this->select('users', 'u')
			->fields('u', $keys)
			->condition('uid', 0, '>');
	}


	public function fields() {
		$fields = $this->baseFields();
		$fields['field_about_the_author/value'] = $this->t('About the author');
		$fields['field_about_the_author/summary'] = $this->t('Summary');
		$fields['field_about_the_author/format'] = $this->t('HTML Format');
		return $fields;

	}

	public function prepareRow(Row $row){

		//add additional row queries here, based on what you added in fields
		$uid = $row->getSourceProperty('uid');

		$query = $this->select('users_roles', 'r');
		$query->fields('r', ['rid']);
		$query->condition('r.uid', $uid, '=');
		$record = $query->execute()->fetchAllKeyed();
		$row->setSourceProperty('roles', array_keys($record));

		$query = null;
		$query = $this->select('field_data_field_about_the_author', 'fdfa')
			->fields('fdfa', ['entity_id', 
				'field_about_the_author_value', 
				'field_about_the_author_summary', 
				'field_about_the_author_format'])
			->condition('entity_id', $uid)
			->execute();
		$about = $query->fetchAll();

		$query = null;
		$query = $this->select('field_data_field_display_name', 'fdfdn')
			->fields('fdfdn', ['field_display_name_value'])
			->condition('entity_id', $uid)
			->execute();
		$displayName = $query->fetchField();

		// $user_picture = [
		// 	'fid' => $row->getSourceProperty('picture'),
		// 	'title' => $displayName,
		// 	'alt' => $displayName,
		// 	'width' => '',
		// 	'height' => ''
		// ];
		
		// $row->setSourceProperty('picture', $user_picture);
		$row->setSourceProperty('field_about_the_author_value', $about[0]['field_about_the_author_value']);
		$row->setSourceProperty('field_about_the_author_summary', $about[0]['field_about_the_author_summary']);
		$row->setSourceProperty('field_about_the_author_format', $about[0]['field_about_the_author_format']);
		$row->setSourceProperty('field_display_name', $displayName);

		return parent::prepareRow($row);
		
	}

	public function getIds() {
		return [
			'uid' => [
				'type' => 'integer',
				'alias' => 'u'
			]
		];
	}

	public function baseFields() {
		$fields = [
			'uid' => $this->t('User ID'),
			'name' => $this->t('Username'),
			'pass' => $this->t('Password'),
			'mail' => $this->t('Email Address'),
			'signature' => $this->t('Signature'),
			'signature_format' => $this->t('Signature Format'),
			'created' => $this->t('Created Timestame'),
			'access' => $this->t('Last Access Timestamp'),
			'login' => $this->t('Last Login Timestamp'),
			'status' => $this->t('Status'),
			'timezone' => $this->t('Timezone'),
			'language' => $this->t('Language'),
			'picture' => $this->t('Picture'),
			'init' => $this->t('Init'),
		];

		return $fields;
	}

	public function bundleMigrationRequired(){
		return false;
	}

	public function entityTypeId(){
		return 'user';
	}


}