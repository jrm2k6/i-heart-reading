<?php

namespace App\Http\Controllers;

use App\Events\StudentAssignmentEnded;
use App\Events\StudentAssignmentUpdated;
use App\Models\AssignmentProgress;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class AssignmentProgressController extends Controller
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
        $this->validate($request, [
            'id' => 'required|exists:assignment_progress',
            'num_pages_read' => 'required|int'
        ]);

        $assignment = AssignmentProgress::find($id);
        $nbPagesRead = $request->input('num_pages_read');
        $assignment->update([
            'num_pages_read' => $nbPagesRead
        ]);

        event(new StudentAssignmentUpdated($assignment->id, $nbPagesRead));

        return response(['progress' => $assignment], 200);
    }

    public function markAsRead($id)
    {
        $assignment = AssignmentProgress::find($id);

        if (! $assignment) {
            return response(['errors' => ['Assignment not existing!']], 422);
        }

        $assignment->update([
           'is_read' => true
        ]);

        event(new StudentAssignmentEnded($assignment->id));

        return response(['progress' => AssignmentProgress::find($id)], 200);
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
