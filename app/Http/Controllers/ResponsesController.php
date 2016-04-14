<?php namespace App\Http\Controllers;

use App\Http\Helpers\ResponseHelper;
use App\Models\Response;
use App\Models\ResponseType;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class ResponsesController extends Controller
{
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
            'content' => 'required_without:url,file|string|min:1|max:2000',
            'file' => 'required_without:content,url|image',
            'url' => 'required_without:content,file|url',
            'type' => 'required|in:text,image,video,link'
        ]);

        $content = $request->input('content');
        $response_type = ResponseType::where('name', $request->input('type'))->first();
        $url = $request->input('url');

        $response = new Response;
        $response->content = ($response_type->requiresContent()) ? null : $content;
        $response->url = ResponseHelper::getUrl($response_type, $request);
        $response->response_type_id = $response_type->id;

        $response->save();

        return response(['response' => $response], 201)->header('Location', '/api/responses/'.$response->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $response = Response::find($id);
        return response($response, 200);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
