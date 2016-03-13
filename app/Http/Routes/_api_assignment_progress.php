<?php

Route::group(['prefix' => 'api', 'middleware' => 'web'], function() {
    Route::put('assignment-progress/{id}/read', 'AssignmentProgressController@markAsRead');
    Route::resource('assignment-progress', 'AssignmentProgressController');
});
