<?php

namespace App\Http\Controllers\Api;

use App\Store;
use App\StoreType;
use App\Address;
use App\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class StoreController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $stores = Store::all();
        return response()->json($stores);
    }

    public function myShop()
    {
        
        $user = Auth::user();
        $store = $user->store;

        $store['store_owner'] = $user->name;
        $store['store_type'] = StoreType::find($store->store_type_id)->name;
        $store['address'] = Address::find($store->address_id)->place;

        return response()->json($store);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $address = Address::create([
            'place'=>$request->input('place'),
            'latitude'=>$request->input('latitude'),
            'longitude'=>$request->input('longitude'),
            'zip'=>$request->input('zip'),
            'country'=>$request->input('country')
        ]);

        $storetype = StoreType::select('id')->where('name', $request['store_type'])->first();
        $request['store_type_id'] = $storetype->id;
        $request['user_id'] = $user->id;
        $request['address_id'] = $address->id;

        $store = Store::create([
            'name'=>$request->input('name')
        ]);
        return response()->json($store, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $user = Auth::user();
        // $user = User::find(1);
        $store = $user->store;

        // if($request->has('address_id')) 
        // {
        //     $address = Address::create([
                // 'place'=>$request->input('place'),
                // 'latitude'=>$request->input('latitude'),
                // 'longitude'=>$request->input('longitude'),
                // 'zip'=>$request->input('zip'),
                // 'country'=>$request->input('country')
        //     ]);
        //     $request['address_id'] = $address->id;
        // } 
        // else
        // {
            
        // } 
        
        $address = Address::find($store->address_id);
        $address->update([
            'place'=>$request->input('address'),
            'latitude'=>$request->input('latitude'),
            'longitude'=>$request->input('longitude'),
            'zip'=>$request->input('zip'),
            'country'=>$request->input('country')
        ]);
        

        // if($request->has('store_type')) 
        // {
        //     $storetype = StoreType::select('id')->where('name', $request['store_type'])->first();
        //     $request['store_type_id'] = $storetype->id;
        // }
        
        $store->update([
            'name'=>$request->input('name'),
            'store_type_id'=>$request['store_type']
        ]);
        return response()->json($store, 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $store = Store::find($id);
        $store->delete();
    }
}
