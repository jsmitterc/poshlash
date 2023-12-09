<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia; // We are going to use this class to render React components

Route::get('/', function () {
    return Inertia::render('Home'); // This will get component Test.jsx from the resources/js/Pages/Test.jsx
});

Route::inertia('/home', 'Home');
Route::inertia('/list', 'ListPage'); // Note: 'ListPage' corresponds to the ListPage.jsx component
Route::inertia('/details/{id}', 'DetailsPage'); 