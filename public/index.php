<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

session_start();

require_once __DIR__ . "/../vendor/autoload.php";

require dirname(__DIR__) . "/config/config.php";

require_once __DIR__ . "/bootstrap.php";

require CORE . "/functions.php";

$router = new \myfrm\Router();

require CONFIG . '/routes.php';
$router->match();