<?php

$factory->defineAs(App\Models\User::class, 'default', function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->email,
        'password' => bcrypt(str_random(10)),
        'remember_token' => str_random(10),
        'role' => 'student'
    ];
});
