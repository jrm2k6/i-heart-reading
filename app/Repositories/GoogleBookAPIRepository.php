<?php

namespace App\Repositories;

use App\Events\Books\BooksSearched;
use GuzzleHttp\Client as GClient;
use Illuminate\Support\Facades\Cache;

class GoogleBookAPIRepository implements BookProviderRepositoryInterface
{
    private $client;

    public function __construct()
    {
        $this->client = new GClient([
            'base_uri' => 'https://www.googleapis.com/books/v1/'
        ]);
    }

    public function searchByTitle($query)
    {
        return $this->search($query, 'intitle');
    }

    public function searchByAuthor($query)
    {
        return $this->search($query, 'inauthor');
    }

    private function search($query, $type)
    {
        $res = $this->client->get('volumes', [
            'query' => [
                'q' => $type . ':' . $query,
                'maxResults' => 40,
                'printType' => 'books',
                'key' => env('GOOGLE_BOOKS_API_KEY')
            ]
        ]);

        if ($res->getStatusCode() === 200) {
            $books = json_decode($res->getBody(), true);
            event(new BooksSearched($books, true));
            return $books;
        }

        return null;
    }

    function getBookById($id)
    {
        $key = 'book_id_' . $id;
        $cachedBook = Cache::get($key);

        if ($cachedBook !== null) {
            return $cachedBook;
        }

        return $this->searchBookById($id);
    }

    private function searchBookById($id)
    {
        $res = $this->client->get('volumes/'.$id, [
            'query' => [
                'key' => env('GOOGLE_BOOKS_API_KEY')
            ]
        ]);

        if ($res->getStatusCode() === 200) {
            $book = json_decode($res->getBody(), true);
            event(new BooksSearched($book, false));
            return $book;
        }

        return null;
    }


}