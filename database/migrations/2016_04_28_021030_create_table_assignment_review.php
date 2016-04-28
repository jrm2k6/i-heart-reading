<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableAssignmentReview extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('decision_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
        });

        Schema::create('assignment_reviews', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('assignment_id')->nullable()->unsigned();
            $table->integer('reviewer_id')->nullable()->unsigned();
            $table->integer('decision_type_id')->nullable()->unsigned();
            $table->text('comment');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('assignment_id')->references('id')->on('book_user');
            $table->foreign('reviewer_id')->references('id')->on('users');
            $table->foreign('decision_type_id')->references('id')->on('decision_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('assignment_reviews');
        Schema::drop('decision_types');
    }
}
