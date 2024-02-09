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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->text('content');
            $table->integer('rating')->default(1); // 1から5までの評価
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            //今回映画テーブルは作成せず映画情報はTMDBのAPIから取得する為外部キー設定ではなく整数値としてカラムを作る
            $table->bigInteger('media_id'); // TMDBの映画タイを保存
            $table->string('media_type'); // TMDBの映画IDを保存

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
