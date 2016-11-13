<?php

Route::group(['prefix' => 'api', 'middleware' => ['web'], 'namespace' => 'Signup'], function() {
    Route::resource('school/contact', 'PrimaryContactController');
    Route::resource('school/group', 'SchoolGroupController');
    Route::resource('school', 'SchoolController');
});
