<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AssignmentReview extends Model
{
    use SoftDeletes;
    
    protected $table = 'assignment_reviews';

    public function isNegative()
    {
        return $this->decisionType->name == 'rejected';
    }

    public function decisionType()
    {
        return $this->belongsTo(DecisionType::class);
    }
}
