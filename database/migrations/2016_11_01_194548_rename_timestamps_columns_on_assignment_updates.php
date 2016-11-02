<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RenameTimestampsColumnsOnAssignmentUpdates extends Migration
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
            $table->renameColumn('created_at', 'created_at_old');
            $table->renameColumn('updated_at', 'updated_at_old');
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
            $table->renameColumn('created_at_old', 'created_at');
            $table->renameColumn('created_at_old', 'updated_at');
        });
    }
}