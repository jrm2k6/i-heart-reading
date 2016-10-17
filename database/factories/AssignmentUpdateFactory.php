<?php

$factory->defineAs(App\Models\AssignmentUpdate::class, 'default', function (Faker\Generator $faker) {
    return [
        'assignment_id' => 1,
        'num_pages' => 100,
        'mark_book_read' => false
    ];
});
