<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return redirect()->route('app');
});

foreach (File::allFiles(__DIR__.'/Routes') as $partial) {
    require $partial->getPathName();
}

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/


Route::group(['middleware' => 'web'], function () {
    Route::auth();

    Route::get('/organization/{token}', 'TokenController@verifyOrganizationTokenAndRedirect');

    Route::get('/signup/{optional?}', [
        'middleware' => 'can_signup_as_organization',
        'as' => 'signup',
        'uses' => 'SignupController@index'
    ])->where('optional', '(.*)');

    Route::get('/admin/{optional?}', [
        'as' => 'signup',
        'uses' => 'IHeartReadingAdminController@index'
    ])->where('optional', '(.*)');

    Route::get('/app/{optional?}', [
        'as' => 'app',
        'uses' => 'HomeController@index'
    ])->where('optional', '(.*)');
});
