<?php

namespace App\Listeners\Books\BooksSearched;

use App\Events\Books\BooksSearched;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Cache;

class CacheBooks
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  BooksSearched  $event
     * @return void
     */
    public function handle(BooksSearched $event)
    {
        $books = $event->books;
        if (is_array($books)) {
            if (array_key_exists('items', $books)) {
                collect($books['items'])->each(
                    function ($bookItem) {
                        $volumeInfo = $bookItem['volumeInfo'];
                        $id = $bookItem['id'];

                        Cache::put('book_id_' . $id, $volumeInfo, 10);
                    }
                );
            }
        } else {
            $volumeInfo = $books['volumeInfo'];
            $id = $books['id'];

            Cache::put('book_id_'.$id, $volumeInfo, 10);
        }
    }
}
