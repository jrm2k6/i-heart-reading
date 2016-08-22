<?php

Route::group(['prefix' => 'api', 'middleware' => ['web', 'auth']], function() {
    Route::get('updates/me', 'AssignmentUpdatesController@getMyUpdates');
    Route::get('updates/{studentId}', 'AssignmentUpdatesController@getUpdatesForStudent');
});
