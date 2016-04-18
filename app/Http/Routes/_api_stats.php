<?php

Route::group(['prefix' => 'api', 'middleware' => 'web'], function() {
    Route::get('stats/me', 'StatsController@getStats');
});
