<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BookAssignment extends Model
{
    use SoftDeletes;

    protected $table = 'book_user';

    protected $fillable = [
        'user_id', 'book_id'
    ];

    protected $dates = ['deleted_at'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function progress()
    {
        return $this->hasOne(AssignmentProgress::class, 'assignment_id');
    }
}
