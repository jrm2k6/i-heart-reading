<?php

namespace App\Events\Books;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class BooksSearched extends Event
{
    use SerializesModels;

    public $books;

    /**
     * Create a new event instance.
     *
     * @param $books
     */
    public function __construct($books)
    {
        $this->books = $books;
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
