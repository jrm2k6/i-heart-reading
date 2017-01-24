<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\SignupOrganizationToken;

class GenerateOrganizationSignupToken extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'signup:generate_organization_token';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate Organization Token to be able to access signup flow';

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
        $token = str_random(10);
        SignupOrganizationToken::create([
            'token' => $token
        ]);

        $this->info('Signup url: https://' . env('APP_URL') . '/signup/' . $token);
    }
}
