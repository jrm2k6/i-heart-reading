<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProspectEmail extends Model
{
    use SoftDeletes;

    protected $table = 'emails';

    protected $fillable = [
      'email'
  ];
}
