<?php

Route::group(['prefix' => 'api', 'middleware' => ['web', 'auth'], 'namespace' => 'Admin'], function() { 
    Route::resource('teacher', 'AdminTeacherController');
    Route::resource('groups', 'AdminGroupController');
});
