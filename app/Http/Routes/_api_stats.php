<?php

Route::group(['prefix' => 'api', 'middleware' => 'web'], function() {
    Route::get('stats/me', 'StatsController@getStats');
    Route::get('stats/{studentId}', 'StatsController@getStatsForStudent');
});
