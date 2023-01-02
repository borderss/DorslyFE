<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TitlePhotos extends Model
{
    protected $fillable = [
        'image',
        'point_of_interest_id',
    ];

    public function PointOfInterest(){
        return $this->belongsTo(PointOfInterest::class ,'point_of_interest_id');
    }

    use HasFactory;
}
