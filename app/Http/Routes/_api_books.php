<?php

Route::group(['prefix' => 'api', 'middleware' => 'web'], function() {
    Route::get('books/search', 'BooksSearchController@search');
    Route::get('books/me', 'BooksController@getMyBooks');
    Route::resource('books', 'BooksController');
    Route::resource('assignments', 'AssignmentsController');
});
