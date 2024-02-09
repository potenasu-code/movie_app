<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
// use GuzzleHttp\Pool;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

// use Illuminate\Support\Facades\Http;

class FavoriteController extends Controller
{
    public function index()
    {
        $api_key = config('services.tmdb.api_key');
        $user = Auth::user();
        $favorites = $user->favorites;
        $details = [];

        // favoritesが空であるかを確認
        if (!$favorites->count()) {
            return response()->json(['message' => 'お気に入りは登録されていません'], 200);
        }

        //TMDBからもデータを取得する
        foreach ($favorites as $favorite) {
            $apiUrl = "https://api.themoviedb.org/3/" . $favorite->media_type . "/" . $favorite->media_id . "?api_key=" . $api_key;

            // このオブジェクト(response)は、APIのレスポンスだけでなく、他のHTTP情報ステータスコード、ヘッダー、クッキーなども持っている
            $response = Http::get($apiUrl);
            if ($response->successful()) {
                $details[] = array_merge($response->json(), ['media_type' => $favorite->media_type]);
            }
        }

        return response()->json($details);

    }

    public function toggleFavorite(Request $request)
    {
        $validatedData = $request->validate([
            "media_type" => 'required|string',
            "media_id" => 'required|integer',
        ]);

        $existingFavorite = Favorite::where('user_id', Auth::id())
            ->where('media_type', $validatedData['media_type'])
            ->where('media_id', $validatedData['media_id'])
            ->first();

        //お気に入りが存在する場合の処理
        if($existingFavorite) {
            $existingFavorite->delete();
            return response()->json(["status" => "removed"]);

        //お気に入りが存在しない場合の処理
        } else {
            Favorite::create([
                'media_type' => $validatedData['media_type'],
                'media_id' => $validatedData['media_id'],
                'user_id' => Auth::id(),
            ]);
            return response()->json(["status" => "added"]);
        }
    }

    public function checkFavoriteStatus(Request $request)
    {
        $validatedData = $request->validate([
            "media_type" => 'required|string',
            "media_id" => 'required|integer',
        ]);

        $isFavorited = Favorite::where('user_id', Auth::id())
            ->where('media_type', $validatedData["media_type"])
            ->where('media_id', $validatedData["media_id"])
            ->exists();

        return response()->json($isFavorited);
    }



}

