<?php namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'role'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function isTeacher()
    {
        return $this->teacher != null;
    }

    public function assignments()
    {
        return $this->hasMany(BookAssignment::class);
    }

    public function assignedBooks()
    {
        return $this->assignments()->where('user_id', $this->id);
    }

    public function assignmentUpdates()
    {
        return $this->hasManyThrough(AssignmentUpdate::class, BookAssignment::class, 'user_id', 'assignment_id');
    }

    public function asAdmin()
    {
        //TODO: double check why it is a collection
        return $this->hasOne(SchoolAdmin::class)->first();
    }

    public function teacher()
    {
        return $this->hasOne(Teacher::class);
    }

    public function school()
    {
        return $this->hasOne(School::class);
    }
}
