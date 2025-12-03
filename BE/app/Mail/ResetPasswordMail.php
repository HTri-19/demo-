<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    public $userName;
    public $email;

    public function __construct($userName, $email)
    {
        $this->userName = $userName;
        $this->email = $email;
    }

    public function build()
    {
        return $this->subject('Yêu cầu đặt lại mật khẩu - myTechstore')
                    ->text('emails.reset-password');
    }
}
