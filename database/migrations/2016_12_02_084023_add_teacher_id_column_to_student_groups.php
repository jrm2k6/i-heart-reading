<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTeacherIdColumnToStudentGroups extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::table('school_groups', function(Blueprint $table)
      {
          $table->integer('teacher_id')->nullable()->unsigned()->after('school_id');
          $table->foreign('teacher_id')->references('id')->on('teachers');
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      Schema::table('school_groups', function(Blueprint $table)
      {
          $table->dropForeign(['teacher_id']);
          $table->dropColumn('teacher_id');
      });
    }
}
