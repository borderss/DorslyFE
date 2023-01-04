<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PointOfInterest extends Model
{
    protected $fillable = [
        'name',
        'description',
        'gps_lng',
        'gps_lat',
        'country',
        'images',
        'opens_at',
        'closes_at',
        'i_open_round_the_clock',
        'is_takeaway',
        'is_on_location',
        'available_seats',
        'review_count',
    ];

    use HasFactory;
}
