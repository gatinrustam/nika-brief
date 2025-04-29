<?php

namespace myfrm;

class App {
  protected static $container;

  static function setContainer($container) {
    static::$container = $container;
  }

  static function getContainer() {
    return static::$container;
  }

  public static function get($service) {
    return static::getContainer()->getService($service);
  }

}
