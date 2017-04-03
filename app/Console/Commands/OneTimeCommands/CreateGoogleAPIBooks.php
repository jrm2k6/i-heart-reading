<?php

namespace App\Console\Commands\OneTimeCommands;

use App\Models\Book;
use App\Models\BookToVerify;
use App\Repositories\BookProviderRepositoryInterface;
use Illuminate\Console\Command;

class CreateGoogleAPIBooks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'books:create_books_from_google';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Takes all existing books and duplicate them to manage google API Books';

    private $bookProviderRepository;
    private $noItemsFound = 0;
    private $multipleResults = 0;
    private $singleResults = 0;
    private $totalBooks = 0;

    /**
     * Create a new command instance.
     *
     * @param BookProviderRepositoryInterface $bookProviderRepository
     */
    public function __construct(BookProviderRepositoryInterface $bookProviderRepository)
    {
        parent::__construct();

        $this->bookProviderRepository = $bookProviderRepository;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        Book::all()->filter(function($book) {
            return $book->description == '';
        })->slice(400)->each(function($book) {
            $title = $book->title;

            $this->info('=============== ' . $book->id);
            $googleAPIBook = $this->fetchBookFromAPI($title);
            $this->info('Saved book is ' . $title . ' and author is ' . $book->author . ' ' . $book->num_pages);
            $this->info('Books fetched ');

            $details = $this->formatForOutput($googleAPIBook);

            $this->info('Results ' . collect($details)->count());

            $matchingBooks = collect($details)->reduce(function($acc, $bookAPI)  use ($book) {
                if (($bookAPI['num_pages'] && (abs((int) $bookAPI['num_pages'] - (int) $book->num_pages) <= 25))  && str_contains($bookAPI['authors'], $book->author)) {
                    $this->warn('title ' . $bookAPI['title'] . ' ' . $bookAPI['authors'] . ' ' . $bookAPI['google_book_id'] . ' pages ' . $bookAPI['num_pages']);
                    return $acc->push($bookAPI);
                }

                return $acc;
            }, collect());

            $numResults = $matchingBooks->count();
            if ($numResults > 1) {

                $bookToVerify = new BookToVerify;
                $bookToVerify->book_id = $book->id;
                $bookToVerify->save();

                $this->multipleResults += 1;

            } else if ($numResults == 1) {

                $bookAPI = $matchingBooks->first();
                $gBook = Book::find($book->id);
                $gBook->title = $book->title;
                $gBook->description = $bookAPI['description'];
                $gBook->num_pages = $bookAPI['num_pages'];
                $gBook->google_book_id = $bookAPI['google_book_id'];
                $gBook->author = $bookAPI['authors'];
                $gBook->image_url = $bookAPI['image'];

                $gBook->save();

                $this->singleResults += 1;

            } else {

                $bookToVerify = new BookToVerify;
                $bookToVerify->book_id = $book->id;
                $bookToVerify->save();

                $this->noItemsFound += 1;

            }

            $this->info('===============');
            $this->totalBooks++;
        });

        $this->info('Results for ' . $this->totalBooks);
        $this->info('Single Results ' . $this->singleResults);
        $this->info('Multiple Results ' . $this->multipleResults);
        $this->info('No Results ' . $this->noItemsFound);
    }

    private function fetchBookFromAPI($title)
    {
        return $this->bookProviderRepository->searchByTitle($title);
    }

    private function formatForOutput($fetchedBooks)
    {
        if (!array_key_exists('items', $fetchedBooks)) {
            return null;
        }

        $booksDetails = collect($fetchedBooks['items'])->map(
            function($bookItem) {
                $volumeInfo = $bookItem['volumeInfo'];
                return [
                    'google_book_id' => $bookItem['id'],
                    'title' => $volumeInfo['title'],
                    'authors' => (array_key_exists('authors', $volumeInfo)) ? implode(', ', $volumeInfo['authors']) : null,
                    'description' => (array_key_exists('description', $volumeInfo)) ? $volumeInfo['description'] : null,
                    'num_pages' => (array_key_exists('pageCount', $volumeInfo)) ? $volumeInfo['pageCount'] : null,
                    'image' => (array_key_exists('imageLinks', $volumeInfo) &&
                        array_key_exists('thumbnail', $volumeInfo['imageLinks'])) ? $volumeInfo['imageLinks']['thumbnail']
                        : null
                ];
            }
        );

        return $booksDetails;
    }
}
