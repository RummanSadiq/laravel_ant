<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'store_id', 'description'
    ];

    public function store() 
    {
        return $this->belongsTo('App\Store');
    }
}
