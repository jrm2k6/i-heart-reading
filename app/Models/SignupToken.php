<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SignupToken extends Model
{
    use SoftDeletes;

    protected $table = 'signup_tokens';

    protected $fillable = [
      'token',
      'school_id',
      'type'
  ];

  public function school()
  {
    return $this->belongsTo(School::class);
  }
}
