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

    protected $appends = [
        'current_review'
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

    public function bookMarkedAsRead()
    {
        return $this->updates->map(function($update) {
            return $update->mark_book_read;
        })->reject(function($item) {
            return !$item;
        })->count() == 1;
    }

    public function progress()
    {
        return $this->hasOne(AssignmentProgress::class, 'assignment_id');
    }

    public function response()
    {
        return $this->belongsTo(Response::class);
    }

    public function updates()
    {
        return $this->hasMany(AssignmentUpdate::class, 'assignment_id');
    }

    public function reviews()
    {
        return $this->hasMany(AssignmentReview::class, 'assignment_id');
    }

    public function currentReview()
    {
        return $this->reviews()->orderBy('created_at', 'DESC')->first();
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

    public function getCurrentReviewAttribute()
    {
        return $this->currentReview();
    }
}
