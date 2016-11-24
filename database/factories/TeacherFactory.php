<?php

$factory->defineAs(App\Models\Teacher::class, 'default', function (Faker\Generator $faker) {
    return [
        'user_id' => 1,
        'school_id' => 1
    ];
});
