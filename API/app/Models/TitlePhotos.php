<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TitlePhotos extends Model
{
    protected $fillable = [
        'image',
        'point_of_interest',
    ];

    use HasFactory;
}
