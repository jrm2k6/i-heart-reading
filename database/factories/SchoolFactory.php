<?php

$factory->defineAs(App\Models\School::class, 'default', function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'address' => $faker->name,
        'domain_name' => 'dragon.com'
    ];
});
