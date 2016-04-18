<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AssignmentUpdate extends Model
{
    protected $table = 'assignment_updates';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'assignment_id', 'num_pages'
    ];
}
