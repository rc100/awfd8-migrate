<?php

namespace Drupal\workbench_email;

use Drupal\Core\Cache\CacheBackendInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\Plugin\DefaultPluginManager;

/**
 * Manages recipient types.
 *
 * @see hook_recipient_type_info_alter()
 * @see \Drupal\workbench_email\Annotation\RecipientType
 * @see \Drupal\workbench_email\Plugin\RecipientTypeInterface
 * @see \Drupal\workbench_email\Plugin\RecipientTypeBase
 * @see plugin_api
 */
class RecipientTypePluginManager extends DefaultPluginManager {

  /**
   * Constructs a RecipientTypePluginManager object.
   *
   * @param \Traversable $namespaces
   *   An object that implements \Traversable which contains the root paths
   *   keyed by the corresponding namespace to look for plugin implementations.
   * @param \Drupal\Core\Cache\CacheBackendInterface $cache_backend
   *   Cache backend instance to use.
   * @param \Drupal\Core\Extension\ModuleHandlerInterface $module_handler
   *   The module handler to invoke the alter hook with.
   */
  public function __construct(\Traversable $namespaces, CacheBackendInterface $cache_backend, ModuleHandlerInterface $module_handler) {
    parent::__construct('Plugin/RecipientType', $namespaces, $module_handler, 'Drupal\workbench_email\Plugin\RecipientTypeInterface', 'Drupal\workbench_email\Annotation\RecipientType');
    $this->alterInfo('recipient_type_info');
    $this->setCacheBackend($cache_backend, 'recipient_type_plugins');
  }

}
