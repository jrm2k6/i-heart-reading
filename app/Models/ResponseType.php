<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResponseType extends Model
{
    const REQUIRING_URLS = ['video', 'link'];

    protected $table = 'response_types';
    public $timestamps = false;

    public function requiresUrl()
    {
        return collect(self::REQUIRING_URLS)->contains($this->name);
    }
}
