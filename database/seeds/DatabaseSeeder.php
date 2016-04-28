<?php use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(ResponsesSeeder::class);
        $this->call(ResponsesSeeder::class);
    }
}
