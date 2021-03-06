<?php namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SchoolGroup extends Model
{
    use SoftDeletes;

    protected $table = 'school_groups';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'name', 'grade', 'nickname', 'is_archived', 'school_id', 'teacher_id'
    ];

    protected $appends = [
        'students'
    ];

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public function studentGroups()
    {
        return $this->hasMany(StudentsGroup::class, 'group_id');
    }

    public function getStudentsAttribute()
    {
        $studentIds = $this->studentGroups->pluck('user_id');
        $students = User::whereIn('id', $studentIds)->get()->toArray();

        return $students;
    }

    /**
     * @param $query
     * @return Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_archived', false);
    }

    /**
     * @param $query
     * @return Builder
     */
    public function scopeArchived($query)
    {
        return $query->where('is_archived', true);
    }
}
