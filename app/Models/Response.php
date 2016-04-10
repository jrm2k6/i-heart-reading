<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Response extends Model
{
    use SoftDeletes;

    public function responseType()
    {
        return $this->belongsTo(ResponseType::class);
    }
}
