<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($media_type, $media_id)
    {
        $reviews = Review::with('user')
        ->where('media_type', $media_type)
        ->where('media_id', $media_id)
        ->get();


        return response()->json($reviews);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'content' => 'required|string',
            'rating' => 'required|integer',
            'media_type' => 'required|string',
            'media_id' => 'required|integer',
        ]);

        $review = Review::create([
            'content' => $validatedData['content'],
            'rating' => $validatedData['rating'],
            'media_type' => $validatedData['media_type'],
            'media_id' => $validatedData['media_id'],
            'user_id' => Auth::id(),
        ]);

        // ユーザーの情報をレビューにロード
        $review->load('user');

        return response()->json($review);
    }

    /**
     * Display the specified resource.
     */
    public function show(Review $review)
    {
        $review->load('user', 'comments.user');
        return response()->json($review);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Review $review)
    {
        $validatedData = $request->validate([
            'content' => 'required|string',
            'rating' => 'required|integer',
        ]);

        $review->update([
            "content" => $validatedData['content'],
            "rating" => $validatedData['rating'],
        ]);

        return response()->json($review);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        // ルートモデルバインディング使用
        $review->delete();
        return response()->json(["message" => "レビューを削除しました"],200);
    }

//丁寧な削除処理😍
// public function destroy(Review $review)
// {
//     // 権限の確認: レビューがユーザー自身によって書かれたものであるかを確認
//     if ($review->user_id !== Auth::id()) {
//         return response()->json(["message" => "権限がありません"], 403);
//     }

//     try {
//         $review->delete();
//         return response()->json(["message" => "レビュー削除しました"], 200);
//     } catch (\Exception $e) {
//         // 何らかの理由で削除に失敗した場合のエラーハンドリング
//         return response()->json(["message" => "レビューの削除に失敗しました"], 500);
//     }
// }

}
