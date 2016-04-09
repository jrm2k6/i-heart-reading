<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddResponseIdColumnToAssignmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('book_user', function(Blueprint $table)
        {
            $table->integer('response_id')->nullable()->unsigned()->after('book_id');
            $table->foreign('response_id')->references('id')->on('responses');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('book_user', function(Blueprint $table)
        {
            $table->dropForeign('book_user_response_id_foreign');
            $table->dropColumn('response_id');
        });
    }
}
