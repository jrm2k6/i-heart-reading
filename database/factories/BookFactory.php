<?php

$factory->defineAs(App\Models\Book::class, 'default', function (Faker\Generator $faker) {
    return [
        'title' => $faker->word,
        'author' => $faker->name,
        'num_pages' => $faker->numberBetween(100, 700)
    ];
});
