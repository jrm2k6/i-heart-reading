<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Mail;

class SendSurveyEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:survey {templateName} {plaintext} {plainText?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send survey email';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $emails = $this->argument('plaintext');
        $emailTemplate = $this->argument('templateName');

        $templates = [$emailTemplate];

        if ($this->argument('plainText')) {
            $plainTextEmail = $this->argument('plainText');
            $templates[] = $plainTextEmail;
        }

        collect(explode(',', $emails))->each(function($email) use ($templates) {

            Mail::queue($templates, [], function ($message) use ($email) {
                /** @var Message $message */
                $message->from('jeremy@iheartreading.co', 'I Heart Reading');
                $message->subject('We need your feedback!');
                $message->to($email);
            });

        });

    }
}
