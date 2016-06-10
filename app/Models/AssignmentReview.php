<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AssignmentReview extends Model
{
    use SoftDeletes;
    
    protected $table = 'assignment_reviews';
    
    public $appends = [
        'decision_type_name'    
    ];

    public function isNegative()
    {
        return $this->decisionType->name == 'rejected';
    }

    public function isPositive()
    {
        return $this->decisionType->name == 'accepted';
    }

    public function decisionType()
    {
        return $this->belongsTo(DecisionType::class);
    }

    public function getDecisionTypeNameAttribute()
    {
        $decisionType = $this->decisionType;
        return ($decisionType) ? $decisionType->name : null;
    }
}
