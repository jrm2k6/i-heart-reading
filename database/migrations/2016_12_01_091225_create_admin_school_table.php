<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdminSchoolTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('school_admins', function (Blueprint $table) {
          $table->increments('id');
          $table->integer('user_id')->nullable()->unsigned();
          $table->integer('school_id')->nullable()->unsigned();
          $table->timestamps();
          $table->softDeletes();

          $table->foreign('school_id')->references('id')->on('schools');
          $table->foreign('user_id')->references('id')->on('users');

      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('school_admins');
    }
}
