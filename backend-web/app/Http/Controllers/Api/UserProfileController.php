<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserProfileController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        $profile = $request->user()->profile;

        if (! $profile) {
            return response()->json(['message' => 'Profil belum diisi.'], 404);
        }

        return response()->json($profile);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'age'           => 'required|integer|min:10|max:100',
            'gender'        => 'required|integer|in:1,2',
            'skin_type'     => 'required|integer|between:1,5',
            'skin_concerns' => 'nullable|string|max:500',
        ]);

        // Upsert: buat baru atau update yang sudah ada
        $profile = $request->user()->profile()->updateOrCreate(
            ['user_id' => $request->user()->id],
            $data
        );

        return response()->json([
            'message' => 'Profil berhasil disimpan!',
            'profile' => $profile,
        ]);
    }
}
