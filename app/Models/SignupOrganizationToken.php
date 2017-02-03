<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SignupOrganizationToken extends Model
{
    use SoftDeletes;

    protected $table = 'signup_organization_tokens';

   /**
   * The attributes that are mass assignable.
   *
   * @var array
   */

  protected $fillable = [
      'token'
  ];

}
