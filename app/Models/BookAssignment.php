<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BookAssignment extends Model
{
    protected $table = 'book_user';

    protected $fillable = [
        'user_id', 'book_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
