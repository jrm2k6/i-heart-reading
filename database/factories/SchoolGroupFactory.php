<?php

$factory->defineAs(App\Models\SchoolGroup::class, 'default', function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'nickname' => $faker->name,
        'grade' => 'Other',
        'school_id' => 1
    ];
});
