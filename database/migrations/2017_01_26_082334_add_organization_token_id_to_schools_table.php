<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddOrganizationTokenIdToSchoolsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('schools', function(Blueprint $table)
      {
          $table->integer('organization_token_id')->nullable()->unsigned()->after('domain_name');
          $table->foreign('organization_token_id')->references('id')->on('signup_organization_tokens');
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('schools', function(Blueprint $table)
        {
            $table->dropForeign(['organization_token_id']);
            $table->dropColumn('organization_token_id');
        });
    }
}
