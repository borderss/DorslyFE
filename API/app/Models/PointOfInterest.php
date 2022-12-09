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
        'reservation_date',
        'opensAt',
        'isOpenRoundTheClock',
        'isTakeaway',
        'isOnLocation',
        'availableSeats',
        'reviewCount',
    ];

    use HasFactory;
}
