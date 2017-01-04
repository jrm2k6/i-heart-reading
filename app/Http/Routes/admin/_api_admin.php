<?php

Route::group(['prefix' => 'api', 'middleware' => ['web', 'auth'], 'namespace' => 'Admin'], function() {
    Route::resource('teacher', 'AdminTeacherController');
    Route::get('group/{$id}/students', '\App\Http\Controllers\Signup\SchoolGroupController@getStudents');
    Route::resource('groups', 'AdminGroupController');
    Route::get('administrator/me', 'AdminAdministratorController@getAdminUser');
    Route::resource('administrator', 'AdminAdministratorController');
});
