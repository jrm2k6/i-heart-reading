<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BookToVerify extends Model
{
    use SoftDeletes;

    protected $table = 'books_to_verify';

    protected $fillable = [
        'book_id'
    ];
}
