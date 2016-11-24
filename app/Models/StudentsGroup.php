<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StudentsGroup extends Model
{
    use SoftDeletes;

    protected $table = 'students_groups';
}
