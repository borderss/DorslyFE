<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deal extends Model
{
    protected $fillable = [
        'user_id',
        'reservation_id',
        'pre_purchase_id',
        'status',
    ];

    public function PointOfInterest(){
        $reservation = $this->belongsTo(Reservation::class, 'reservation_id');

        return $reservation->belongsTo(PointOfInterest::class, 'point_of_interest_id');
    }

    public function Reservation(){
        return $this->belongsTo(Reservation::class, 'reservation_id');
    }

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    use HasFactory;
}
