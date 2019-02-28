<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        "sender_id", "receiver_id", "sender_type", "receiver_type", "description"
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
