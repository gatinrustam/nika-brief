<?php

use myfrm\Validator;
use myfrm\App;
use models\BriefModel;

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['error' => 'Метод не поддерживается']);
  exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || !isset($data['data'])) {
  http_response_code(400);
  echo json_encode(['error' => 'Некорректные данные']);
  exit;
}

$form = $data['data'];

$validator = new Validator();

$validation = $validator->validate($form, [
    'name' => ['required' => true, 'max' => 255],
    'email' => [
      'required' => true,
      'email' => true,
      'max' => 255,
      'unique' => 'brief_submissions:email'  // Добавляем проверку уникальности
    ],
    'siteType' => ['required' => true],
  ]);

if ($validation->hasErrors()) {
  http_response_code(422);
  echo json_encode(['errors' => $validation->getErrors()]);
  exit;
}

try {
  $briefModel = new BriefModel();

  if ($briefModel->hasEmail($form['email'])) {
    http_response_code(409);
    echo json_encode(['error' => 'Заявка с таким email уже существует']);
    exit;
  }

  $saved = $briefModel->createBrief([
    'name' => $form['name'] ?? null,
    'email' => $form['email'] ?? null,
    'site_type' => $form['siteType'] ?? null,
    'domain_choice' => $form['domain']['choice'] ?? null,
    'payload' => json_encode($form, JSON_UNESCAPED_UNICODE),
    'created_at' => date('Y-m-d H:i:s')
  ]);

  if (!$saved) {
    http_response_code(500);
    echo json_encode(['error' => 'Не удалось сохранить бриф']);
    exit;
  }

  echo json_encode(['success' => true]);
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Ошибка сервера', 'details' => $e->getMessage()]);
}