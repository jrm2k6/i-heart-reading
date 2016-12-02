<?php namespace App\Http\Controllers\Admin;

use App\Http\Requests;
use App\Models\SchoolAdmin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminAdministratorController extends Controller
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
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
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
          'user_id' => 'required|exists:users,id',
          'school_id' => 'required|exists:schools,id',
      ]);

      $admin = SchoolAdmin::create([
          'user_id' => $request->input('user_id'),
          'school_id' => $request->input('school_id'),
      ]);

      return response(['school_admin' => $admin], 201)->header('Location', '/api/administrator/'.$admin->id);
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
          'school_id' => 'required|exists:schools,id',
          'user_id' => 'required|exists:users,id',
          'administrator_id' => 'required|exists:school_admins,id'
      ]);

      $admin = SchoolAdmin::find($id);

      if (! $admin)
          return response(null, 400);

      $admin->update($request->only('user_id', 'school_id'));

      return response(['school_admin' => $admin, 200]);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
      $admin = SchoolAdmin::find($id);

      if (! $admin)
          return response(null, 404);

      $admin->delete();
      return response(null, 200);
  }
}
