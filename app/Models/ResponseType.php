<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResponseType extends Model
{
    protected $table = 'response_types';
    public $timestamps = false;

    public function requiresContent()
    {
        return $this->name !== 'text';
    }

    public function requiresUrl()
    {
        return $this->name == 'link' || $this->name == 'video';
    }
}
