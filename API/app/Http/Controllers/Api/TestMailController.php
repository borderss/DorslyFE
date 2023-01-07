<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\TestEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class TestMailController extends Controller
{
    public function sendEmail()
    {
        Mail::to("liepins01@gmail.com")->send(new TestEmail("testing!!!!!!!"));
    }
}
