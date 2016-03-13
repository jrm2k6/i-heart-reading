<?php

namespace App\Http\Controllers;

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

        AssignmentProgress::find($id)->update([
            'num_pages_read' => $request->input('num_pages_read')
        ]);

        return response(['progress' => AssignmentProgress::find($id)], 200);
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
