<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Teacher extends Model
{
    use SoftDeletes;

    protected $table = 'teachers';

        /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'school_id', 'user_id'
    ];

    protected $appends = [
        'user'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getUserAttribute()
    {
        return $this->user()->first();
    }
}
