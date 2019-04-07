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

Route::get('/users/shop', 'Api\UserController@hasShop');


//Shop
Route::get('/shops', 'Api\StoreController@index');
Route::post('/shop', 'Api\StoreController@store');
Route::post('/updateshop', 'Api\StoreController@update');
Route::delete('/shops/{id}', 'Api\StoreController@destroy');
Route::get('/myshop', 'Api\StoreController@myShop');

//Shop Attachments
Route::get('/attachments/shop', 'Api\ShopAttachmentController@index');
Route::post('/attachments/shop', 'Api\ShopAttachmentController@store');


//Store Types
Route::get('/storetypes', 'Api\StoreTypeController@index');

//Categories
Route::get('/categories', 'Api\CategoryController@index');

//Posts
Route::get('/posts', 'Api\PostController@index');
Route::post('/posts', 'Api\PostController@store');
Route::post('/product_post', 'Api\PostController@productPost');
Route::post('/posts/{id}', 'Api\PostController@update');
Route::delete('/posts/{id}', 'Api\PostController@destroy');
// Route::get('/myposts', 'Api\PostController@show');

//Products
Route::get('/products', 'Api\ProductController@index');
Route::post('/products', 'Api\ProductController@store');
Route::post('/products/{id}', 'Api\ProductController@update');
Route::delete('/products/{id}', 'Api\ProductController@destroy');


//Faqs
Route::get('/faqs', 'Api\FaqController@index');
Route::post('/faqs', 'Api\FaqController@store');
Route::post('/faqs/{id}', 'Api\FaqController@update');
Route::delete('/faqs/{id}', 'Api\FaqController@destroy');

//Reviews
Route::get('/reviews', 'Api\ReviewController@index');
Route::post('/reviews', 'Api\ReviewController@store');
Route::post('/reviews/{id}', 'Api\ReviewController@update');
Route::delete('/reviews/{id}', 'Api\ReviewController@destroy');


//Messages
// Route::get('/messages', 'Api\MessageController@index');
Route::get('/messages/{id}', 'Api\MessageController@show');
Route::post('/messages/shop', 'Api\MessageController@shopSent'); //might not get used 
Route::post('/messages/customer', 'Api\MessageController@customerSent'); //might not get used 
// Route::post('/messages', 'Api\MessageController@messageSent'); //sending message to a specific id
Route::delete('/messages/{id}', 'Api\MessageController@destroy'); //Delete chat with some user

//Conversations
Route::get('/conversations/shop', 'Api\ConversationController@shopConversations');
Route::get('/conversations/customer', 'Api\ConversationController@customerConversations');


//Image Attachments 

Route::post(
    '/attachment/{type}',
    function (Request $request, $type) {
        $image = $request->file('image');
        $input['imagename'] = time() . '.' . $image->getClientOriginalExtension();
        $destinationPath = public_path('attachments/shops/' . $type);
        $image->move($destinationPath, $input['imagename']);
        $destinationPath2 = __DIR__ . '../../../customer_ant/public/attachments/shops/' . $type  . '/';
        copy($destinationPath . '/' . $input['imagename'], $destinationPath2 . '/' . $input['imagename']);

        return response()->json([
            'status' => 'done',
            // 'url'=> asset($_SERVER['DOCUMENT_ROOT'].'/../resources/images/'. $type  .'/'. $input['imagename'])
            'url' => '../attachments/shops/' . $type  . '/' . $input['imagename']
        ]);
    }
);
