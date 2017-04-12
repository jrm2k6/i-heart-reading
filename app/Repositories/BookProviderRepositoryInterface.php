<?php namespace App\Repositories;

interface BookProviderRepositoryInterface
{
    function searchByTitle($query);

    function searchByAuthor($query);

    function getBookById($id);
}