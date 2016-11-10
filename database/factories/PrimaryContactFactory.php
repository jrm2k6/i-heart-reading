<?php

$factory->defineAs(App\Models\PrimaryContact::class, 'default', function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'email_address' => $faker->safeEmail,
        'role' => $faker->jobTitle,
        'school_id' => 1
    ];
});
