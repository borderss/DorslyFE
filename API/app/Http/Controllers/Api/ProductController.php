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
        if (auth()->user()->is_admin === false){
            return response()->json([
                'message' => 'You are not authorized to do this action'
            ], 403);
        }

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
        if (auth()->user()->is_admin === false){
            return response()->json([
                'message' => 'You are not authorized to do this action'
            ], 403);
        }

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
        if (auth()->user()->is_admin === false){
            return response()->json([
                'message' => 'You are not authorized to do this action'
            ], 403);
        }

        $product = Product::find($id);
        $product->delete();
        return new ProductResourse($product);
    }

    public function filter(Request $request)
    {
        if (auth()->user()->is_admin === false){
            return response()->json([
                'message' => 'You are not authorized to do this action'
            ], 403);
        }

        $validated = $request->validate([
            'by'=>'required',
            'value'=>'required',
            'paginate'=>'required|integer'
        ]);

        if ($validated['by'] == 'all'){
            $users = Product::where('id', "LIKE", "%{$validated['value']}%")
                ->orWhere('name', "LIKE", "%{$validated['value']}%")
                ->orWhere('description', "LIKE", "%{$validated['value']}%")
                ->orWhere('point_of_interest_id', "LIKE", "%{$validated['value']}%")
                ->orWhere('ingredients', "LIKE", "%{$validated['value']}%")
                ->orWhere('price', "LIKE", "%{$validated['value']}%")
                ->orWhere('created_at', "LIKE", "%{$validated['value']}%")
                ->orWhere('updated_at', "LIKE", "%{$validated['value']}%")
                ->paginate($validated['paginate']);
        } else {
            $users = Product::where($validated['by'], "LIKE", "%{$validated['value']}%")->paginate($validated['paginate']);
        }

        return ProductResourse::collection($users);
    }
}
