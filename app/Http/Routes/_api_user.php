<?php

Route::group(['prefix' => 'api', 'middleware' => 'web'], function() {
    Route::get('user/me', 'UserProfileController@getMe');
    Route::resource('user', 'UserProfileController');
});
