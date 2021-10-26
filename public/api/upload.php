<?php

require_once __DIR__.'/../../vendor/autoload.php';

use App\Dropzone;

header('Content-Type: application/json');

if (strtoupper($_SERVER['REQUEST_METHOD']) === 'POST') {
	echo Dropzone::getInstance()->upload($_FILES['files']);
}