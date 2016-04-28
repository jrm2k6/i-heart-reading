<?php

use App\Models\DecisionType;
use Illuminate\Database\Seeder;

class DecisionTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $decision_type = new DecisionType;
        $decision_type->name = 'accepted';
        $decision_type->save();

        $decision_type = new DecisionType;
        $decision_type->name = 'rejected';
        $decision_type->save();
    }
}
