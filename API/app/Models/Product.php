<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'point_of_interest',
        'ingredients',
        'image',
        'price',
    ];

    use HasFactory;
}
