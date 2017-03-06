<?php

namespace App\Events\Signup;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class SchoolCreated extends Event
{
    use SerializesModels;

    public $schoolId;
    public $session;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($schoolId, $session)
    {
        $this->schoolId = $schoolId;
        $this->session = $session;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [];
    }
}
