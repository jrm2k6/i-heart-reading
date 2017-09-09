<?php

$factory->defineAs(App\Models\SignupToken::class, 'student', function (Faker\Generator $faker) {
    return [
        'type' => 'student',
        'token' => 'abcd',
        'school_id' => 1
    ];
});
