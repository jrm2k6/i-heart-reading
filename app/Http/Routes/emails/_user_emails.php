<?php

Route::group(['middleware' => ['web'], 'namespace' => 'Emails'], function() {
    Route::get('confirm', 'EmailTransactionController@confirmEmail');
    Route::post('resend-confirmation-email', 'EmailTransactionController@resendConfirmationEmail');
});
