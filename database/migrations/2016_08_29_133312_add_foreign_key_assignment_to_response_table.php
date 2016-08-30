<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeyAssignmentToResponseTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('responses', function(Blueprint $table)
        {
            $table->integer('assignment_id')->nullable()->unsigned()->after('response_type_id');
            $table->foreign('assignment_id')->references('id')->on('book_user');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('responses', function(Blueprint $table)
        {
            $table->dropForeign('response_assignment_id_foreign');
            $table->dropColumn('assignment_id');
        });
    }
}
