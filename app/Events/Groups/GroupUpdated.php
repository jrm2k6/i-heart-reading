<?php

namespace App\Events\Groups;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class GroupUpdated extends Event
{
    use SerializesModels;
    public $updatedGroup;
    public $oldGroup;

    /**
     * Create a new event instance.
     *
     * @param $oldGroup
     * @param $updatedGroup
     */
    public function __construct($oldGroup, $updatedGroup)
    {
        $this->oldGroup = $oldGroup;
        $this->updatedGroup = $updatedGroup;
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
