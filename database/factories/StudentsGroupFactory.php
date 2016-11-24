<?php

$factory->defineAs(App\Models\StudentsGroup::class, 'default', function (Faker\Generator $faker) {
    return [
        'user_id' => 1,
        'group_id' => 1
    ];
});
