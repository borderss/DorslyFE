<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrePurchase extends Model
{
    use HasFactory;

    protected $fillable = [
        'products',
        'status',
        'payment_status',
    ];
}
