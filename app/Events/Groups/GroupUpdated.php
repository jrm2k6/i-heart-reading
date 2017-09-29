<?php

namespace App\Events\Groups;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class GroupUpdated extends Event
{
    use SerializesModels;

    public $wasArchived;
    public $isArchived;
    public $previousTeacherId;
    public $currentTeacherId;
    /**
     * Create a new event instance.
     *
     * @param $wasArchived
     * @param $isArchived
     * @param $previousTeacherId
     * @param $currentTeacherId
     */
    public function __construct($wasArchived, $isArchived, $previousTeacherId, $currentTeacherId)
    {
        $this->wasArchived = $wasArchived;
        $this->isArchived = $isArchived;
        $this->previousTeacherId = $previousTeacherId;
        $this->currentTeacherId = $currentTeacherId;
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
