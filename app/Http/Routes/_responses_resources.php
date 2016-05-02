<?php

Route::group(['middleware' => 'web', 'prefix' => 'responses'], function() {
    Route::get('{filename}', 'ResponsesResourcesController@getFile');
});
