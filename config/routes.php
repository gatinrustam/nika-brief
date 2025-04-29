<?php

use myfrm\middleware\Auth;
use myfrm\middleware\Admin;
use myfrm\middleware\Guest;

/** @var $router */

// Middlewares
const MIDDLEWARE = [
  "auth" => Auth::class,
  "admin" => Admin::class,
  "guest" => Guest::class,
];

$router->get("", "index/index.php");

$router->post("api/submit", "api/submit.php");