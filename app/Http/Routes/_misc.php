<?php

Route::group(['middleware' => ['web'], 'namespace' => 'Emails'], function() {
    Route::get('confirmation-email', 'EmailTransactionController@showConfirmationEmailPage');
});
