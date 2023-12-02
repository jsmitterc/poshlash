<?php

namespace App\Http\Controllers;

use App\Models\StorePromotions;
use App\Http\Requests\StoreStorePromotionsRequest;
use App\Http\Requests\UpdateStorePromotionsRequest;

class StorePromotionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return 1;
        $all = StorePromotions::all();
        return response()->json($all);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStorePromotionsRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(StorePromotions $storePromotions)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StorePromotions $storePromotions)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStorePromotionsRequest $request, StorePromotions $storePromotions)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StorePromotions $storePromotions)
    {
        //
    }
}
