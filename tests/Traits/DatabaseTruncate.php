<?php namespace Testing\Traits;

trait DatabaseTruncate
{
    /**
     * Define hooks to truncate the database before each test.
     *
     * @return void
     */
    public function runTruncateDatabase()
    {
        $this->artisan('testing:truncate-db');
    }
}
