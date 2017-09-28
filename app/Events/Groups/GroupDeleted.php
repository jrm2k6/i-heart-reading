<?php

namespace App\Events\Groups;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class GroupDeleted extends Event
{
    use SerializesModels;
    public $teacherId;

    /**
     * Create a new event instance.
     *
     * @param $teacherId
     */
    public function __construct($teacherId)
    {
        $this->teacherId = $teacherId;
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
