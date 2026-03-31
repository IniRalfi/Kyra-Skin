<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->onDelete('cascade');
            $table->integer('age');
            $table->tinyInteger('gender');    // 1=Pria, 2=Wanita
            $table->tinyInteger('skin_type'); // 1=Kering, 2=Berminyak, 3=Sensitif, 4=Kombinasi, 5=Normal
            $table->text('skin_concerns')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};
