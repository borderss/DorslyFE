<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interest_point extends Model
{
    protected $fillable = [
        'name',
        'description',
        'gps_lng',
        'gps_lat',
        'country',
        'image_id',
        'reservation_date',
    ];
    use HasFactory;
}
