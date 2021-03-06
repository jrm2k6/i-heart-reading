<?php namespace App\Http\Helpers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

use App\Models\ResponseType;

class ResponseHelper
{
    public static function getUrl(ResponseType $responseType, $request)
    {
        if ($responseType->name == 'link' || $responseType->name == 'video') {
            return $request->input('url');
        } else {
            $file = $request->file('file');

            if ($file) {
                $pathFile = 'responses/' . Auth::user()->id . '_' . uniqid() . '.jpg';
                Storage::put($pathFile, file_get_contents($file->getRealPath()));

                return '/' . $pathFile;
            }
        }
        
        return '';
    }
}