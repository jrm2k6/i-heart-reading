<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $table = 'books';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'author', 'num_pages',
    ];

    public function readers()
    {
        return $this->belongsToMany(User::class);
    }
}
