<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BookAssignment extends Model
{
    use SoftDeletes;

    protected $table = 'book_user';

    protected $fillable = [
        'user_id', 'book_id', 'response_id'
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

    public function response()
    {
        return $this->belongsTo(Response::class);
    }

    public function reviews()
    {
        return $this->hasMany(AssignmentReview::class, 'assignment_id');
    }

    public function negativeReviews()
    {
        return $this->reviews->filter(function($review) {
            return $review->isNegative();
        });
    }

    public function positiveReviews()
    {
        return $this->reviews->filter(function($review) {
            return ! $review->isNegative();
        });
    }

    public function scopeHasResponse($query)
    {
        return $query->whereNotNull('response_id');
    }
}
