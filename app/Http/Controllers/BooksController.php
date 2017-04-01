<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Models\Book;

class BooksController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(['books' => Book::all()], 200);
    }

    public function getMyBooks()
    {
        $books = Auth::user()->assignedBooks()->with('book', 'progress', 'response')->get();
        return response(['books' => $books], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        /*
         * This should just take a google id book and create the book representation behind the scenes
         */
        $this->validate($request, [
            'book_title' => 'required|string|max:500|unique:books,title',
            'book_author_name' => 'required|string',
            'book_nb_pages' => 'required|integer',
        ]);

        $book = Book::create([
            'title' => $request->input('book_title'),
            'author' => $request->input('book_author_name'),
            'num_pages' => $request->input('book_nb_pages'),
        ]);

        return response(['book' => $book], 201)->header('Location', '/api/books/'.$book->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }
}
