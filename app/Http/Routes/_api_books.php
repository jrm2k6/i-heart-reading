<?php

Route::group(['prefix' => 'api', 'middleware' => 'web'], function() {
    Route::get('books/search', 'BooksSearchController@search');
    Route::resource('books', 'BooksController');
    Route::resource('assignments', 'AssignmentsController');
});
