<?php

Route::group(['prefix' => 'api', 'middleware' => 'web'], function() {
    Route::resource('books', 'BooksController');
    Route::resource('assignments', 'AssignmentsController');
});
