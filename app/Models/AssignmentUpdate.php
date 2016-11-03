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
        'assignment_id', 'num_pages', 'mark_book_read', 'previous_assignment_id'
    ];

    protected $appends = [
        'num_pages_read'
    ];

    public function assignment()
    {
        return $this->belongsTo(BookAssignment::class, 'assignment_id');
    }

    public function previousAssignmentUpdate()
    {
        return $this->belongsTo(AssignmentUpdate::class, 'previous_assignment_id');
    }

    public function getNumPagesReadAttribute()
    {
        if ($this->mark_book_read == true) {
            return 0;
        }

        if ($this->previous_assignment_id != null) {
            $previousAssignmentPagesRead = $this->previousAssignmentUpdate->num_pages;
            return $this->num_pages - $previousAssignmentPagesRead;
        } else {
            return $this->num_pages;
        }
    }
}
