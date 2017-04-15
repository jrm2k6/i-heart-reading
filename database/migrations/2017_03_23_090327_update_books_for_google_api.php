<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateBooksForGoogleApi extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('books', function(Blueprint $table) {
            $table->string('google_book_id')->nullable()->after('num_pages');
            $table->mediumText('description')->nullable()->after('google_book_id')->default(null);
            $table->string('image_url')->nullable()->after('description');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('books', function(Blueprint $table) {
            $table->dropColumn('google_book_id');
            $table->dropColumn('description');
            $table->dropColumn('image_url');
        });
    }
}
