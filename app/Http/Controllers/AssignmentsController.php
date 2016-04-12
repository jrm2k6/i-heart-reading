<?php namespace App\Http\Controllers;

use App\Models\AssignmentProgress;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Models\BookAssignment;
class AssignmentsController extends Controller
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
        $this->validate($request, [
            'book_id' => 'required|exists:books,id'
        ]);

        $assignment = BookAssignment::create([
            'user_id' => $request->user()->id,
            'book_id' => $request->input('book_id')
        ]);

        AssignmentProgress::create([
            'assignment_id' => $assignment->id,
            'num_pages_read' => 0
        ]);

        return response(['assignment' => $assignment], 201)->header('Location', '/api/assignments/'.$assignment->id);
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
            'user_id' => 'required|exists:users,id|in:'.Auth::user()->id,
            'book_id' => 'required|exists:books,id',
            'response_id' => 'exists:responses,id'
        ]);

        $assignment = BookAssignment::find($id);

        if (! $assignment)
            return response(null, 404);

        $assignment->update($request->only('user_id', 'book_id', 'response_id'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $assignment = BookAssignment::find($id);

        if (! $assignment)
            return response(null, 404);

        $assignment->delete();
        return response(null, 200);
    }
}
