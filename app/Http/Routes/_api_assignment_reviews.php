<?php

Route::group(['prefix' => 'api', 'middleware' => ['web', 'teacher']], function() {
    Route::get('assignment-reviews/me', 'AssignmentReviewsController@getMyAssignmentsToReview');
    Route::get('assignment-reviews/me/completed', 'AssignmentReviewsController@getCompletedReviews');
    Route::resource('assignment-reviews', 'AssignmentReviewsController');
    Route::get('teacher/me/updates', 'AssignmentUpdatesController@getMyStudentUpdates');
});
