<?php

namespace App\Repositories;

use GuzzleHttp\Client as GClient;

class GoogleBookAPIRepository implements BookProviderRepositoryInterface
{
    private $client;

    public function __construct()
    {
        $this->client = new GClient([
            'base_uri' => 'https://www.googleapis.com/books/v1/'
        ]);
    }

    function searchByTitle($query)
    {
        $res = $this->client->get('volumes', [
            'query' => [
                'q' => 'intitle:' . $query,
                'maxResults' => 40,
                'printType' => 'books',
                'key' => env('GOOGLE_BOOKS_API_KEY')
            ]
        ]);

        if ($res->getStatusCode() === 200) {
            return json_decode($res->getBody(), true);
        }

        return null;
    }

    function searchByAuthor($query)
    {
        $res = $this->client->get('volumes', [
            'query' => [
                'q' => 'inauthor:' . $query,
                'maxResults' => 40,
                'printType' => 'books',
                'key' => env('GOOGLE_BOOKS_API_KEY')
            ]
        ]);

        if ($res->getStatusCode() === 200) {
            return json_decode($res->getBody(), true);
        }

        return null;
    }

    function getBookById($id)
    {
        // TODO: Implement getBookById() method.
    }
}