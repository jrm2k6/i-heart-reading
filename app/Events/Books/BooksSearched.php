<?php

namespace App\Events\Books;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class BooksSearched extends Event
{
    use SerializesModels;

    public $books;
    public $multiplesResults;

    /**
     * Create a new event instance.
     *
     * @param $books
     * @param $multiplesResults
     */
    public function __construct($books, $multiplesResults)
    {
        $this->books = $books;
        $this->multiplesResults = $multiplesResults;
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
