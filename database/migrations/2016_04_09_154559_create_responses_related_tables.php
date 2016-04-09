<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateResponsesRelatedTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('response_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
        });

        Schema::create('responses', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('response_type_id')->unsigned();
            $table->string('content')->nullable();
            $table->string('url')->nullable();

            $table->foreign('response_type_id')->references('id')->on('response_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropTable('response_types');
        Schema::dropTable('responses');
    }
}
