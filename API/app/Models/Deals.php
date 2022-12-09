<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deals extends Model
{
    protected $fillable = [
        'user_id',
        'point_of_interest_id',
        'type',
        'prices',
        'status',
    ];

    public function PointOfInterest(){
        return $this->belongsTo(PointOfInterest::class ,'point_of_interest_id');
    }

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    use HasFactory;
}
