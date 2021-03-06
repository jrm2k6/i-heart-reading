<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Models\AssignmentReview;
use App\Models\DecisionType;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\BookAssignment;
use Illuminate\Support\Facades\Auth;

class AssignmentReviewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function getMyAssignmentsToReview()
    {
        $currentUser = Auth::user();
        $teacher = $currentUser->teacher;

        $groups = $teacher->groups();
        $nonArchivedGroups = $groups->active()->get();

        // TODO: use pivot relationship
        $studentsGroups = $nonArchivedGroups->map(function($group) { return $group->studentGroups; })->flatten();
        $studentIds = $studentsGroups->map(function($studentGroup) { return $studentGroup->user_id; });

        $assignments = BookAssignment::with('user', 'book', 'response')->whereIn('user_id', $studentIds);

        $reviews = $assignments->hasResponse()->get()
            ->filter(function($book) {
                return $book->currentReview() == null ||
                    $book->currentReview()->isNegative();
            })->values();

        return response(['assignment_reviews' => $reviews], 200);
    }

    public function getCompletedReviews()
    {
        $currentUser = Auth::user();
        $teacher = $currentUser->teacher;

        $groups = $teacher->groups();
        $nonArchivedGroups = $groups->active()->get();

        // TODO: use pivot relationship
        $studentsGroups = $nonArchivedGroups->map(function($group) { return $group->studentGroups; })->flatten();
        $studentIds = $studentsGroups->map(function($studentGroup) { return $studentGroup->user_id; });

        $assignments = BookAssignment::with('user', 'book', 'response')->whereIn('user_id', $studentIds);

        $reviews = $assignments->hasResponse()->get()
            ->filter(function($book) {
                return $book->currentReview() !== null &&
                $book->currentReview()->isPositive();
            })->values();

        return response(['completed_reviews' => $reviews], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'response_id' => 'required|exists:responses,id',
            'assignment_id' => 'required|exists:book_user,id,response_id,'.$request->input('response_id'),
            'comment' => 'string|min:10|max:300',
            'decision' => 'required|string|in:accepted,rejected'
        ]);

        $review = new AssignmentReview;
        $review->assignment_id = $request->input('assignment_id');
        $review->reviewer_id = Auth::user()->id;
        $review->comment = $request->input('comment');
        $review->decision_type_id = DecisionType::where('name', $request->input('decision'))->first()->id;

        $review->save();

        return response(['assignment_review' => $review], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
