<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ReviewController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FavoriteController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {

    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {

    // ***********😀review関係ここから******************************************************************

    // review一覧
    Route::get('/reviews/{media_type}/{media_id}', [ReviewController::class, 'index']);

    //登録
    Route::post('/reviews', [ReviewController::class, 'store']);

    //削除
    Route::delete('/review/{review}', [ReviewController::class, 'destroy']);

    //更新
    Route::put('/reviews/{review}', [ReviewController::class, 'update']);

    //review詳細
    Route::get('/reviews/{review}', [ReviewController::class, 'show']);




    // APIエンドポンとの名前が全てreviewsから始まっているので以下のようにルーティングをグループとしてまとめる方法もあります😀
    // ※以下のグループにまとめた記述を利用する場合はフロントの削除APIの呼び出しでreviewからreveiwsに変更してください
    // Route::prefix('reviews')->group(function () {

    //     //一覧
    //     Route::get('{media_type}/{media_id}', [ReviewController::class, 'index']);

    //     //登録
    //     Route::post('/', [ReviewController::class, 'store']);

    //     //削除（ルートモデルバインディング使用）
    //     Route::delete('{review}', [ReviewController::class, 'destroy']);

    //     //更新(ルートモデルバインディング使用)
    //     Route::put('{review}', [ReviewController::class, 'update']);

    //     //詳細
    //     Route::get('{review}', [ReviewController::class, 'show']);
    // });

    // ***********😀review関係ここまで******************************************************************



    // ***********🍚comments関係ここから******************************************************************

    // 一覧
    Route::get('/comments', [CommentController::class, 'index']);

    // 登録
    Route::post('/comments', [CommentController::class, 'store']);

    //削除
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy']);
    //更新
    Route::put('/comments/{comment}', [CommentController::class, 'update']);

    //以下のようにルーティングをグループとしてまとめる方法もあります↓↓😀 comments関連
    // Route::prefix('comments')->group(function () {

    //     // 登録
    //     Route::post('/comments', [CommentController::class, 'store']);

    //     // 更新
    //     Route::put('comments/{comment}', [CommentController::class, 'update']);

    //     // 削除
    //     Route::delete('comments/{comment}', [CommentController::class, 'destroy']);
    // });

    // ***********🍚comments関係ここまで******************************************************************



    // ***********😂favorites関係ここから******************************************************************

        //一覧
        Route::get('/favorites', [FavoriteController::class, 'index']);

        //登録or削除
        Route::post('/favorites', [FavoriteController::class, 'toggleFavorite']);

        //お気に入りの状態の判定
        Route::get('favorites/status', [FavoriteController::class, 'checkFavoriteStatus']);

        //以下のようにルーティングをグループとしてまとめる方法もあります↓↓😀

        // Route::prefix('favorites')->group(function () {
        //     //一覧
        //     Route::get('/', [FavoriteController::class, 'index']);

        //     //登録or削除
        //     Route::post('/', [FavoriteController::class, 'toggleFavorite']);

        //     //お気に入りの状態の判定
        //     Route::get('/status', [FavoriteController::class, 'checkFavoriteStatus']);
        // });


    // ***********😂favorites関係ここまで******************************************************************

});



