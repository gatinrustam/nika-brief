<?php
namespace myfrm;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class Mailer
{
    private $mail;

    public function __construct()
    {
        $this->mail = new PHPMailer(true);
        $this->setup();
    }

    private function setup()
    {
        try {
            $this->mail->isSMTP();
            $this->mail->Host = 'smtp.majordomo.ru';
            $this->mail->SMTPAuth = true;
            $this->mail->Username = 'noreply@gatinrustam.ru';
            $this->mail->Password = 'face1717';
            $this->mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $this->mail->Port = 587;

            $this->mail->CharSet = 'UTF-8';

            $this->mail->SetFrom('noreply@gatinrustam.ru', 'VPN-сервер');
        } catch (Exception $e) {
            echo "Ошибка настройки: {$e->getMessage()}";
        }
    }

    public function sendMail($toEmail, $toName, $subject, $body)
    {
        try {
            $this->mail->addAddress($toEmail, $toName);

            $this->mail->isHTML(true);
            $this->mail->Subject = $subject;
            $this->mail->Body    = $body;
            $this->mail->AltBody = strip_tags($body);

            $this->mail->send();
            return true;
        } catch (Exception $e) {
            $_SESSION['error'] = "Ошибка при отправке письма: {$this->mail->ErrorInfo}";
            return false;
        }
    }
}