<?php

use App\Models\ResponseType;
use Illuminate\Database\Seeder;

class ResponsesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $text_response_type = new ResponseType;
        $text_response_type->name = 'text';
        $text_response_type->save();

        $image_response_type = new ResponseType;
        $image_response_type->name = 'image';
        $image_response_type->save();

        $video_response_type = new ResponseType;
        $video_response_type->name = 'video';
        $video_response_type->save();

        $link_response_type = new ResponseType;
        $link_response_type->name = 'link';
        $link_response_type->save();
    }
}
