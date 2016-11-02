<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MakeTimestampNullableToAvoidUpdateIssueOnAssignmentUpdates extends Migration
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
            $table->nullableTimestamps();
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
            $table->dropTimestamps();
        });
    }
}
