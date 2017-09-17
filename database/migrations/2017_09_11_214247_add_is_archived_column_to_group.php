<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddIsArchivedColumnToGroup extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('school_groups', function(Blueprint $table) {
            $table->boolean('is_archived')->default(false)->after('nickname');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('school_groups', function(Blueprint $table) {
            $table->dropColumn('is_archived');
        });
    }
}
