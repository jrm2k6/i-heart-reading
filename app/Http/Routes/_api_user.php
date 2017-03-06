<?php

Route::group(['prefix' => 'api', 'middleware' => 'web'], function() {
    Route::get('user/me', 'UserProfileController@getMe');
    Route::post('user/me/password/verify', 'UserProfileController@verifyMyPassword');
    Route::resource('user', 'UserProfileController');
});
