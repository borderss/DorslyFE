<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'user_id',
        'point_of_interest_id',
        'text',
    ];

    protected $user_id = "";
    protected $point_of_interest_id = "";
    protected $text = "";

    public function PointOfInterest(){
        return $this->belongsTo(PointOfInterest::class ,'point_of_interest_id');
    }

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    use HasFactory;
}
