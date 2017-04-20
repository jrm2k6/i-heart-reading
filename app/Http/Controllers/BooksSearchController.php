<?php namespace App\Http\Controllers;

use App\Repositories\BookProviderRepositoryInterface;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class BooksSearchController extends Controller
{
    private $bookProviderRepository;

    public function __construct(BookProviderRepositoryInterface $bookProviderRepository)
    {
        $this->bookProviderRepository = $bookProviderRepository;
    }
    
    public function search(Request $request)
    {
        $this->validate($request, [
            'type' => 'required|in:author,title',
            'query' => 'required|string'
        ]);

        $query = $request->input('query');
        $type = $request->input('type');

        if ($type == 'author') {
            $fetchedBooks = $this->bookProviderRepository->searchByAuthor($query);
        } else {
            $fetchedBooks = $this->bookProviderRepository->searchByTitle($query);
        }

        $books = $this->formatForOutput($fetchedBooks);

        return response(['suggestions' => $books, 'num_results' => $fetchedBooks['totalItems']], 200);
    }

    private function formatForOutput($fetchedBooks)
    {
        $items = array_key_exists('items', $fetchedBooks) ? $fetchedBooks['items'] : [];

        $booksDetails = collect($items)->map(
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
