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
    Route::get('/', function () {
        return view('static.landing');
    });

    Route::auth();
    
    Route::post('/send-email', 'LandingPageController@saveEmail');
    Route::post('/register-token', 'SignupController@registerWithToken@registerWithToken');
    Route::get('/signup/students/{token}', 'SignupController@signupStudents');
    Route::get('/signup/staff/{token}', 'SignupController@signupStaffMember');
    Route::get('/organization/{token}', 'TokenController@verifyOrganizationTokenAndRedirect');
    Route::get('/confirm-token', 'TokenController@confirmOrganizationToken');
    Route::post('/verify-token', 'TokenController@verifyOrganizationToken');
    
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
