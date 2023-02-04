<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deal extends Model
{
    protected $fillable = [
        'user_id',
        'point_of_interest_id',
        'reservation_id',
        'pre_purchase_id',
        'status',
    ];

    public function pointOfInterest(){
        return $this->belongsTo(PointOfInterest::class, 'point_of_interest_id');
    }

    public function reservation(){
        return $this->belongsTo(Reservation::class, 'reservation_id');
    }

    public function prePurchase(){
        return $this->belongsTo(PrePurchase::class, 'pre_purchase_id');
    }

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    use HasFactory;
}
