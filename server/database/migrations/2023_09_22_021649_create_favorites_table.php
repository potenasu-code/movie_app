<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('favorites', function (Blueprint $table) {
            $table->id();
            //今回映画テーブルは作成せず映画情報はTMDBのAPIから取得する為外部キー設定ではなく整数値としてカラムを作る
            $table->string('media_type'); // TMDBの映画タイプを保存
            $table->bigInteger('media_id'); // TMDBの映画IDを保存
            // $table->string('poster_path'); // ポスターのパスを保存※poster_pathが変更された場合写真が表示されないデメリットあり
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->unique(['user_id', 'media_type','media_id']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('favorites');
    }
};

