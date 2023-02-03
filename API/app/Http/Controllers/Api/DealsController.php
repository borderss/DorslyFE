<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DealsRequest;
use App\Http\Resources\DealsResourse;
use App\Models\Deal;
use Illuminate\Http\Request;

class DealsController extends Controller
{
    public function index()
    {
        return DealsResourse::collection(Deal::paginate(10));
    }
    public function store(DealsRequest $request)
    {

    }

    public function show($id)
    {
        return new DealsResourse(Deal::find($id));
    }

    public function update(DealsRequest $request, $id)
    {
        Deal::find($id)->update($request->validated());

        return new DealsResourse(Deal::find($id));
    }

    public function destroy($id)
    {
        $deal = Deal::find($id);
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
            $users = Deal::where('id', "LIKE", "%{$validated['value']}%")
                ->orWhere('user_id', "LIKE", "%{$validated['value']}%")
                ->orWhere('point_of_interest_id', "LIKE", "%{$validated['value']}%")
                ->orWhere('type', "LIKE", "%{$validated['value']}%")
                ->orWhere('prices', "LIKE", "%{$validated['value']}%")
                ->orWhere('status', "LIKE", "%{$validated['value']}%")
                ->paginate($validated['paginate']);
        } else {
            $users = Deal::where($validated['by'], "LIKE", "%{$validated['value']}%")->paginate($validated['paginate']);
        }

        return DealsResourse::collection($users);
    }
}
