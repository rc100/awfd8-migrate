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

		return $this->select('users', 'u')
			->fields('u', array_keys($this->baseFields()))
			->condition('uid', 0, '>');
	}


	public function fields() {
		$fields = $this->baseFields();

		// $fields['first_name'] = $this->('First Name');
		// $fields['last_name'] = $this->('Last Name');
		// $fields['biography'] = $this->('Biography');

		return $fields;

	}

	public function prepareRow(Row $row){

		//add additional row queries here, based on what you added in fields
		return parent::prepareRow();
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