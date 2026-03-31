<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserProfile extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'age', 'gender', 'skin_type', 'skin_concerns'];

    // Helper label untuk frontend & AI
    public const GENDER_LABELS = [1 => 'Pria', 2 => 'Wanita'];
    public const SKIN_TYPE_LABELS = [
        1 => 'Kering',
        2 => 'Berminyak',
        3 => 'Sensitif',
        4 => 'Kombinasi',
        5 => 'Normal',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
