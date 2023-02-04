<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'point_of_interest_id',
        'date',
        'number_of_people',
    ];

    public function pointOfInterest()
    {
        return $this->belongsTo(PointOfInterest::class);
    }
}
