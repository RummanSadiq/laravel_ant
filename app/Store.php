<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'owner_id', 
        'store_type_id', 
        'address_id',
        'name',
        'display_picture',
        'wifi',
        'try_room',
        'card_payment',
        'wheel_chair',
        'wash_room',
        'delivery',
        'return_policy',
        'open_time',
        'close_time',
    ];
}
