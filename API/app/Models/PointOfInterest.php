<?php

namespace App\Models;

use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PointOfInterest extends Model
{
    use HasFactory, Filterable;

    public function modelFilter()
    {
        return $this->provideFilter(\App\ModelFilters\PointOfInterestFilter::class);
    }

    protected $casts = [
        'opens_at'=> 'datetime:H:i',
        'closes_at'=> 'datetime:H:i',
    ];

    protected $fillable = [
        'name',
        'description',
        'gps_lng',
        'gps_lat',
        'country',
        'images',
        'opens_at',
        'closes_at',
        'is_open_round_the_clock',
        'is_takeaway',
        'is_on_location',
        'available_seats',
        'review_count',
    ];
}
