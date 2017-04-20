<?php namespace App\Http\Controllers;

use App\Models\AssignmentProgress;
use App\Models\Book;
use App\Repositories\BookProviderRepositoryInterface;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Models\BookAssignment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class AssignmentsController extends Controller
{
    private $bookProviderRepository;

    public function __construct(BookProviderRepositoryInterface $bookProviderRepository)
    {
        $this->bookProviderRepository = $bookProviderRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'book_id' => 'required',
        ]);
        
        $book = $this->getBookFromBookId($request->input('book_id'));

        $assignment = BookAssignment::create([
            'user_id' => $request->user()->id,
            'book_id' => $book->id
        ]);

        AssignmentProgress::create([
            'assignment_id' => $assignment->id,
            'num_pages_read' => 0
        ]);

        return response(['assignment' => $assignment], 201)->header('Location', '/api/assignments/'.$assignment->id);
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

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'user_id' => 'required|exists:users,id|in:'.Auth::user()->id,
            'book_id' => 'required|exists:books,id',
            'response_id' => 'exists:responses,id'
        ]);

        $assignment = BookAssignment::find($id);

        if (! $assignment)
            return response(null, 400);

        $assignment->update($request->only('user_id', 'book_id', 'response_id'));

        return response(['assignment' => $assignment], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $assignment = BookAssignment::find($id);

        if (! $assignment)
            return response(null, 404);

        $assignment->delete();
        return response(null, 200);
    }

    private function getBookFromBookId($googleBookId)
    {
        $bookWithGoogleBookId = Book::where('google_book_id', $googleBookId)->get();

        if ($bookWithGoogleBookId->count() > 0) {
            return $bookWithGoogleBookId->first();
        }

        $fetchedBook = $this->bookProviderRepository->getBookById($googleBookId);

        if ($fetchedBook !== null) {
            $attributesBook = $this->getBooksAttributes($googleBookId, $fetchedBook);
            $book = new Book;
            $book->google_book_id = $attributesBook['google_book_id'];
            $book->title = $attributesBook['title'];
            $book->description = $attributesBook['description'];
            $book->author = $attributesBook['authors'];
            $book->num_pages = $attributesBook['num_pages'];
            $book->image_url = $attributesBook['image'];

            $book->save();

            return $book;
        }

        abort(500, 'Error while retrieving book');
    }

    private function getBooksAttributes($googleBookId, $fetchedBook)
    {
        return [
            'google_book_id' => $googleBookId,
            'title' => $fetchedBook['title'],
            'authors' => (array_key_exists('authors', $fetchedBook)) ? implode(', ', $fetchedBook['authors']) : 'Unknown',
            'description' => (array_key_exists('description', $fetchedBook)) ? $fetchedBook['description'] : null,
            'num_pages' => (array_key_exists('pageCount', $fetchedBook)) ? $fetchedBook['pageCount'] : null,
            'image' => (array_key_exists('imageLinks', $fetchedBook) &&
                array_key_exists('thumbnail', $fetchedBook['imageLinks'])) ? $fetchedBook['imageLinks']['thumbnail']
                : null
        ];
    }
}
