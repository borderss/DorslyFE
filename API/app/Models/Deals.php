<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deals extends Model
{
    protected $fillable = [
        'user_id',
        'point_of_interest',
        'type',
        'prices',
        'status',
    ];

    use HasFactory;
}
