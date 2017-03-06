<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PrimaryContact extends Model
{
    use SoftDeletes;

    protected $table = 'primary_contacts';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'name', 'email_address', 'role', 'school_id'
    ];
}
