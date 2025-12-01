<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comment;
class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cmt = Comment::all();
        return response()->json([
            'message' => true,
            'data' => $cmt
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $cmt = Comment::create([
            'user_id' => $request->user_id,
            'product_id' => $request->product_id,
            'rating' => $request->rating,
            'comment_text' => $request->comment_text
        ]);

        return response()->json([
            'message'=> true,
            'success' => $cmt,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $cmt = Comment::find($id);
        if(!$cmt){
            return response()->json([
                'success' => false,
                'message' => 'Comment not found'
            ], 200);
        }
        return response()->json([
            'success'=> true,
            'data' => $cmt
        ], 200);
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
        $cmt = Comment::find($id);
        if(!$cmt){
            return response()->json([
                'success' => false,
                'message' => 'Comment not found'
            ], 404);
        }
        $cmt->update([
            'rating' => $request->rating,
            'comment_text' => $request->comment_text
        ], );
        return response()->json([
            'successs' => true,
            'message' => 'Comment updated successfully',
            'data' => $cmt
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $cmt = Comment::find($id);
        $cmt->delete();
        return response()->json([
            'success' => true,
            'message' => 'Comment đã được xóa',
            'data' => $cmt
        ], 200);
    }
}
