<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


//Posts
Route::get('/posts', 'Api\PostController@index');
Route::post('/posts', 'Api\PostController@store');
Route::post('/posts/{id}', 'Api\PostController@update');
Route::delete('/posts/{id}', 'Api\PostController@destroy');
Route::get('/myposts', 'Api\PostController@show');

//Products
Route::get('/products', 'Api\ProductController@index');
Route::post('/products', 'Api\ProductController@store');
Route::post('/products/{id}', 'Api\ProductController@update');
Route::delete('/products/{id}', 'Api\ProductController@destroy');
Route::get('/products/{id}', 'Api\ProductController@myProducts');


//Faqs
Route::get('/faqs', 'Api\FaqController@index');
Route::post('/faqs', 'Api\FaqController@store');
Route::post('/faqs/{id}', 'Api\FaqController@update');
Route::delete('/faqs/{id}', 'Api\FaqController@destroy');


//Messages
Route::get('/messages', 'Api\MessageController@index');
Route::get('/messages/{id}', 'Api\MessageController@show');
Route::post('/messages', 'Api\MessageController@store'); //might not get used 
Route::post('/messages/{id}', 'Api\MessageController@update'); //sending message to a specific id
Route::delete('/messages/{id}', 'Api\MessageController@destroy'); //Delete chat with some user