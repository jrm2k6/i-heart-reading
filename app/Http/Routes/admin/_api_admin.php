<?php

Route::group(['prefix' => 'api', 'middleware' => ['web', 'auth'], 'namespace' => 'Admin'], function() {
    Route::resource('teacher', 'AdminTeacherController');
    Route::resource('groups', 'AdminGroupController');
    Route::get('administrator/me', 'AdminAdministratorController@getAdminUser');
    Route::resource('administrator', 'AdminAdministratorController');
});
