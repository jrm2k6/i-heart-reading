<?php

Route::group(['prefix' => 'api', 'middleware' => 'web'], function() {
    Route::resource('assignment-progress', 'AssignmentProgressController');
});
