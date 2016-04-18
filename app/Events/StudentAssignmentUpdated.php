<?php

namespace App\Events;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class StudentAssignmentUpdated extends Event
{
    use SerializesModels;

    public $assignmentId;
    public $nbPages;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($assigmentId, $nbPages)
    {
        $this->assignmentId = $assigmentId;
        $this->nbPages = $nbPages;
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
