<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResourse;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return ProductResourse::collection(Product::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return ProductResourse
     */
    public function store(ProductRequest $request)
    {
        $product = Product::create($request->validated());

        return new ProductResourse($product);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return ProductResourse
     */
    public function show($id)
    {
        return new ProductResourse(Product::find($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return ProductResourse
     */
    public function update(ProductRequest $request, $id)
    {
        Product::find($id)->update($request->validated());

        return  new ProductResourse(Product::find($id));

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return ProductResourse
     */
    public function destroy($id)
    {
        $product = Product::find($id);
        $product->delete();
        return new ProductResourse($product);
    }
}
