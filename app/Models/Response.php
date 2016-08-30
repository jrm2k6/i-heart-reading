<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Response extends Model
{
    use SoftDeletes;

    public $appends = [
        'response_type_name'
    ];

    public function responseType()
    {
        return $this->belongsTo(ResponseType::class);
    }

    public function assignment()
    {
        return $this->belongsTo(BookAssignment::class);
    }

    public function getResponseTypeNameAttribute()
    {
       return $this->responseType->name;
    }
}
