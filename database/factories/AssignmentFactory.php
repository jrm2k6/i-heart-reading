<?php

$factory->defineAs(App\Models\BookAssignment::class, 'default', function (Faker\Generator $faker) {
    return [
        'user_id' => 1,
        'book_id' => 1
    ];
});
