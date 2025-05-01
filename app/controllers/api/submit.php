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
    abort(422, 'Ошибка', $validation->getErrors());
}

try {
    $briefModel = new BriefModel();

    $saved = $briefModel->createBrief([
        'name' => $form['name'] ?? null,
        'email' => $form['email'] ?? null,
        'site_type' => $form['siteType'] ?? null,
        'domain_choice' => $form['domain']['choice'] ?? null,
        'markdown' => $form['markdown'] ?? null,
        'payload' => json_encode($form, JSON_UNESCAPED_UNICODE),
        'created_at' => date('Y-m-d H:i:s')
    ]);

    if (!$saved) {
        abort(500, 'Не удалось сохранить бриф');
    }

    success('Бриф успешно отправлен');

} catch (Exception $e) {
    abort(500, 'Ошибка сервера', ['exception' => $e->getMessage()]);
}