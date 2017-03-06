<?php

Route::group(['prefix' => 'api', 'middleware' => ['web', 'can_signup_as_organization'], 'namespace' => 'Signup'], function() {
    Route::post('signup/finish', '\App\Http\Controllers\SignupController@finish');
    Route::resource('school/contact/verify', 'PrimaryContactController@verifyExists');
    Route::resource('school/contact', 'PrimaryContactController');
    Route::resource('school/group', 'SchoolGroupController');
    Route::resource('school', 'SchoolController');
});
