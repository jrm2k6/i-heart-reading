<?php

Route::group(['prefix' => 'api', 'middleware' => ['web'], 'namespace' => 'Signup'], function() {
    Route::resource('school', 'SchoolController');
    Route::resource('school/contact', 'PrimaryContactController');
});
