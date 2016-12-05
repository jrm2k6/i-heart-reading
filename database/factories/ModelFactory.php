<?php

$factory->define(App\Models\AssignmentProgress::class, function (Faker\Generator $faker) {
    return [
        'assignment_id' =>  $faker->randomNumber() ,
        'num_pages_read' =>  $faker->randomNumber() ,
        'is_read' =>  $faker->boolean ,
    ];
});

$factory->define(App\Models\AssignmentReview::class, function (Faker\Generator $faker) {
    return [
        'assignment_id' =>  $faker->randomNumber() ,
        'reviewer_id' =>  $faker->randomNumber() ,
        'decision_type_id' =>  $faker->randomDigit ,
        'comment' =>  $faker->text ,
    ];
});

$factory->define(App\Models\AssignmentUpdate::class, function (Faker\Generator $faker) {
    return [
        'assignment_id' =>  $faker->randomNumber() ,
        'num_pages' =>  $faker->randomNumber() ,
        'mark_book_read' =>  0 ,
        'previous_assignment_id' => null ,
        'created_at_old' =>  $faker->dateTimeBetween() ,
        'updated_at_old' =>  $faker->dateTimeBetween() ,
    ];
});

$factory->define(App\Models\Book::class, function (Faker\Generator $faker) {
    return [
        'title' =>  $faker->word ,
        'author' =>  $faker->word ,
        'num_pages' =>  $faker->randomNumber() ,
    ];
});

$factory->define(App\Models\BookAssignment::class, function (Faker\Generator $faker) {
    return [
        'user_id' =>  $faker->randomDigit ,
        'book_id' =>  $faker->randomDigit ,
        'response_id' =>  null ,
    ];
});

$factory->define(App\Models\DecisionType::class, function (Faker\Generator $faker) {
    return [
        'name' =>  $faker->name ,
    ];
});

$factory->define(App\Models\EmailConfirmation::class, function (Faker\Generator $faker) {
    return [
        'email' =>  $faker->safeEmail ,
        'token' =>  $faker->word ,
    ];
});

$factory->define(App\Models\PrimaryContact::class, function (Faker\Generator $faker) {
    return [
        'school_id' =>  $faker->randomNumber() ,
        'name' =>  $faker->name ,
        'email_address' =>  $faker->word ,
        'role' =>  $faker->word ,
    ];
});

$factory->define(App\Models\Response::class, function (Faker\Generator $faker) {
    return [
        'response_type_id' =>  $faker->randomDigit ,
        'assignment_id' =>  $faker->randomDigit ,
        'content' =>  $faker->text ,
        'url' =>  $faker->url ,
    ];
});

$factory->define(App\Models\ResponseType::class, function (Faker\Generator $faker) {
    return [
        'name' =>  $faker->name ,
    ];
});

$factory->define(App\Models\School::class, function (Faker\Generator $faker) {
    return [
        'name' =>  $faker->name ,
        'address' =>  $faker->word ,
        'domain_name' =>  $faker->word ,
    ];
});

$factory->define(App\Models\SchoolGroup::class, function (Faker\Generator $faker) {
    return [
        'school_id' =>  $faker->randomNumber() ,
        'name' =>  $faker->name ,
        'grade' =>  $faker->word ,
        'nickname' =>  $faker->word ,
    ];
});

$factory->define(App\Models\StudentsGroup::class, function (Faker\Generator $faker) {
    return [
        'user_id' =>  $faker->randomNumber() ,
        'group_id' =>  $faker->randomNumber() ,
    ];
});

$factory->define(App\Models\Teacher::class, function (Faker\Generator $faker) {
    return [
        'user_id' =>  $faker->randomNumber() ,
        'school_id' =>  $faker->randomNumber() ,
    ];
});

$factory->define(App\Models\SchoolAdmin::class, function (Faker\Generator $faker) {
    return [
        'user_id' =>  $faker->randomNumber() ,
        'school_id' =>  $faker->randomNumber() ,
    ];
});

$factory->define(App\Models\User::class, function (Faker\Generator $faker) {
    return [
        'name' =>  $faker->name ,
        'email' =>  $faker->safeEmail ,
        'password' =>  bcrypt($faker->password) ,
        'role' =>  $faker->word ,
        'confirmed' =>  $faker->boolean ,
        'remember_token' =>  str_random(10) ,
    ];
});
