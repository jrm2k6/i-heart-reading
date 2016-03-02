<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AssignmentProgress extends Model
{
    protected $table = 'assignment_progress';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'assignment_id', 'num_pages_read',
    ];
}
