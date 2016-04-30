<?php

Route::group(['prefix' => 'api', 'middleware' => ['web', 'teacher']], function() {
    Route::get('assignment-reviews/me', 'AssignmentReviewsController@getMyAssignmentsToReview');
    Route::resource('assignment-reviews', 'AssignmentReviewsController');
});
