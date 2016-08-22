<?php

Route::group(['prefix' => 'api', 'middleware' => ['web', 'auth']], function() {
    Route::get('stats/me', 'StatsController@getStats');
    Route::get('stats/{studentId}', 'StatsController@getStatsForStudent');
});
