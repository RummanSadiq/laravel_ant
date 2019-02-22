<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stores', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('owner_id')->unsigned();
            $table->foreign('owner_id')->references('id')->on('users');

            $table->integer('store_type_id')->unsigned();
            $table->foreign('store_type_id')->references('id')->on('store_types');

            $table->integer('address_id')->unsigned();
            $table->foreign('address_id')->references('id')->on('addresses');

            $table->string('name');
            $table->string('display_picture');
            $table->boolean('wifi');
            $table->boolean('try_room');
            $table->boolean('card_payment');
            $table->boolean('wheel_chair');
            $table->boolean('wash_room');
            $table->boolean('delivery');

            $table->string('return_policy');

            $table->time('open_time');
            $table->time('close_time');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stores');
    }
}
