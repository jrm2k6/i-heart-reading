<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Intervention\Image\Facades\Image;

class ResponsesResourcesController extends Controller
{
    public function getFile($fileName)
    {
        $filePath = 'app/responses/'.$fileName;
        $img = Image::make(storage_path($filePath))->resize(300, 200);
        return $img->response('jpg');
    }
}
