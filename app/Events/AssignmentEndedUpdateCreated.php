<?php

namespace App\Events;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class AssignmentEndedUpdateCreated extends Event
{
    use SerializesModels;

    protected $assignmentId;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($assignmentId)
    {
        $this->assignmentId = $assignmentId;
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
