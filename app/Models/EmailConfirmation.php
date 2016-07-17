<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmailConfirmation extends Model
{
    protected $table = 'email_confirmations';
    public $timestamps = false;

    protected $fillable = [
        'email', 'token'
    ];
}
