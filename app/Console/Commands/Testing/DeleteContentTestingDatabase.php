<?php namespace App\Console\Commands\Testing;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class DeleteContentTestingDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'testing:truncate-db';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Running before each test, making sure the content of the testing db is reset';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        DB::statement("SET foreign_key_checks=0");
        $tables = DB::select("SELECT TABLE_NAME as name FROM INFORMATION_SCHEMA.TABLES where  table_schema in ('i-heart-reading-testing')");
        collect($tables)->each(function($item) {
           DB::statement("TRUNCATE ".$item->name.";");
        });
        DB::statement("SET foreign_key_checks=1");

    }
}
