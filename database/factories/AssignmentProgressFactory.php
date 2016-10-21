<?php

$factory->defineAs(App\Models\AssignmentProgress::class, 'default', function (Faker\Generator $faker) {
    return [
        'assignment_id' => 1,
        'num_pages_read' => 100,
        'is_read' => false
    ];
});
