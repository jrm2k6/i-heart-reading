<?php

Route::group(['prefix' => 'api', 'middleware' => 'web'], function() {
    Route::resource('books', 'BooksController');
});
