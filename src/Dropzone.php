<?php

namespace App;

use Throwable;

class Dropzone
{

	private static $instance;

	/**
	 * Create an instance of the class
	 */
	public static function getInstance()
	{
		if (!isset(self::$instance)) {
			return self::$instance = new self;
		}

		return self::$instance;
	}

	/**
	 * Upload the files to the backend
	 */
	public function upload($files)
	{
		try {
			foreach ($files['tmp_name'] as $key => $file) {
				move_uploaded_file($file, __DIR__.'/../public/storage/'.$files['name'][$key]);
			}
		
			return json_encode([
				'message' => 'Files uploaded successfully',
				'type' => 'success' 
			]);
		} catch (Throwable $e) {
			return json_encode([
				'message' => $e->getMessage(),
				'type' => 'error'
			]);
		}
	}

}