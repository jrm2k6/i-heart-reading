<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPreviousUpdateIdToUpdates extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('assignment_updates', function(Blueprint $table)
        {
            $table->integer('previous_assignment_id')->nullable()->unsigned()->after('mark_book_read');
            $table->foreign('previous_assignment_id')->references('id')->on('assignment_updates');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('assignment_updates', function(Blueprint $table)
        {
            $table->dropForeign(['previous_assignment_id']);
            $table->dropColumn('previous_assignment_id');
        });
    }
}
