<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'point_of_interest_id',
        'ingredients',
        'image',
        'price',
    ];

    public function PointOfInterest(){
        return $this->belongsTo(PointOfInterest::class ,'point_of_interest_id');
    }
    use HasFactory;
}
