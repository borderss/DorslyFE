<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DealsRequest;
use App\Http\Resources\DealsResourse;
use App\Models\Deals;
use Illuminate\Http\Request;

class DealsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return DealsResourse::collection(Deals::paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return DealsResourse
     */
    public function store(DealsRequest $request)
    {
        $deal = Deals::create($request->validated());

        return new DealsResourse($deal);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return DealsResourse
     */
    public function show($id)
    {
        return new DealsResourse(Deals::find($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return DealsResourse
     */
    public function update(DealsRequest $request, $id)
    {
        Deals::find($id)->update($request->validated());

        return new DealsResourse(Deals::find($id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return DealsResourse
     */
    public function destroy($id)
    {
        $deal = Deals::find($id);
        $deal->delete();
        return new DealsResourse($deal);
    }

    public function filter(Request $request)
    {
        $validated = $request->validate([
            'by'=>'required',
            'value'=>'required',
            'paginate'=>'required|integer'
        ]);

        if ($validated['by'] == 'all'){
            $users = Deals::where('id', "LIKE", "%{$validated['value']}%")
                ->orWhere('user_id', "LIKE", "%{$validated['value']}%")
                ->orWhere('point_of_interest_id', "LIKE", "%{$validated['value']}%")
                ->orWhere('type', "LIKE", "%{$validated['value']}%")
                ->orWhere('prices', "LIKE", "%{$validated['value']}%")
                ->orWhere('status', "LIKE", "%{$validated['value']}%")
                ->paginate($validated['paginate']);
        } else {
            $users = Deals::where($validated['by'], "LIKE", "%{$validated['value']}%")->paginate($validated['paginate']);
        }

        return DealsResourse::collection($users);
    }
}
