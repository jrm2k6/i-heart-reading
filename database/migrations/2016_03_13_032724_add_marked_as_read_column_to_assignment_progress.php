<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddMarkedAsReadColumnToAssignmentProgress extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('assignment_progress', function(Blueprint $table)
        {
            $table->boolean('is_read')->default(false)->after('num_pages_read');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('assignment_progress', function (Blueprint $table)
        {
            $table->dropColumn('is_read');
        });
    }
}
