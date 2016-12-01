<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SchoolAdmin extends Model
{
  use SoftDeletes;

  protected $table = 'school_admins';

      /**
   * The attributes that are mass assignable.
   *
   * @var array
   */

  protected $fillable = [
      'school_id', 'user_id'
  ];
}
