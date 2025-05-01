<?php
function abort(int $code = 404, string $message = '', array $errorDetails = []): void
{
    http_response_code($code);
    header('Content-Type: application/json');

    $defaultMessages = [
        400 => 'Bad Request',
        401 => 'Unauthorized',
        403 => 'Forbidden',
        404 => 'Not Found',
        500 => 'Internal Server Error',
    ];

    $response = [
        'status' => 'error',
        'message' => $message ?: ($defaultMessages[$code] ?? 'Unknown error'),
        'data' => null,
        'error' => [
            'code' => $code,
            'details' => $errorDetails ?: 'No additional details provided',
        ]
    ];

    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    die;
}

function success(string $message, mixed $data = null): void {
  echo json_encode([
      'status' => 'success',
      'message' => $message,
      'data' => $data,
      'error' => null
  ], JSON_UNESCAPED_UNICODE);
  exit;
}

function load(array $fillable = [])
{
  $data = [];

  foreach ($_POST as $key => $value) {
    if (in_array($key, $fillable)) {
      $data[$key] = trim($value);
    }
  }

  return $data;
}

function old($fieldname)
{
  return isset($_POST[$fieldname]) ? h($_POST[$fieldname]) : "";
}

function h($str)
{
  return htmlspecialchars($str, ENT_QUOTES, "");
}

function redirect($url = "")
{
  if ($url) {
    $redirect = $url;
  } else {
    $redirect = isset($_SERVER["HTTP_REFERER"]) ? $_SERVER["HTTP_REFERER"] : PATH;
  }

  header("Location: {$redirect}");
  die;
}

function db(): myfrm\Db
{
    return myfrm\App::get(myfrm\Db::class);
}

function uuidv4()
{
  $data = random_bytes(16);

  $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 0100
  $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set bits 6-7 to 10
    
  return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}


// функции отладки
function dump($data)
{
  echo "<pre>";
  var_dump($data);
  echo "</pre>";
}

function print_arr($data)
{
  echo "<pre>";
  print_r($data);
  echo "</pre>";
}

function dd($data)
{
  dump($data);
  die;
}

function ddJson($data)
{
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($data);
  die;
}