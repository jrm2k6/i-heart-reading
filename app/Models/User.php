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
        'name', 'email', 'password',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

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
}
