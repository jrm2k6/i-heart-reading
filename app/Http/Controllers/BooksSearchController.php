<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Models\Book;

class BooksSearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('query');

        $titles = Book::whereRaw("MATCH(title, author) AGAINST (? IN BOOLEAN MODE)", [$query])
            ->get();

        return response(['suggestions' => $titles], 200);
    }
}
