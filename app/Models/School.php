<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class School extends Model
{
    use SoftDeletes;

    protected $table = 'schools';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'name', 'address', 'domain_name',
    ];

    public function teachers()
    {
        return $this->hasMany(Teacher::class);
    }

    public function groups()
    {
        return $this->hasMany(SchoolGroup::class);
    }
}
