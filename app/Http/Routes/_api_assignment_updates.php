<?php

Route::group(['prefix' => 'api', 'middleware' => ['web']], function() {
    Route::get('updates/me', 'AssignmentUpdatesController@getMyUpdates');
});
