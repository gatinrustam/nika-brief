<?php

use myfrm\Validator;
use models\BriefModel;

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    abort(405, 'Метод не поддерживается');
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || !isset($data['data'])) {
    abort(400, 'Некорректные данные', ['input' => $data]);
}

$form = $data['data'];

$validator = new Validator();

$validation = $validator->validate($form, [
    'name' => ['required' => true, 'max' => 255],
    'email' => [
        'required' => true,
        'email' => true,
        'max' => 255,
        'unique' => 'brief_submissions:email'
    ],
    'siteType' => ['required' => true],
]);

if ($validation->hasErrors()) {
    abort(422, 'Ошибка валидации', $validation->getErrorMessageString());
}

try {
    $briefModel = new BriefModel();

    if ($briefModel->hasEmail($form['email'])) {
        abort(409, 'Заявка с таким email уже существует');
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
        abort(500, 'Не удалось сохранить бриф');
    }

    echo json_encode([
        'status' => 'success',
        'message' => 'Бриф успешно сохранён',
        'data' => null,
        'error' => null
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    abort(500, 'Ошибка сервера', ['exception' => $e->getMessage()]);
}