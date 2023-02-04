<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReservationResource;
use App\Models\PointOfInterest;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function reservationAvailable(Request $request)
    {
        $validated = $request->validate([
            'point_of_interest_id' => 'required|integer',
            'date' => 'required|date_format:Y-m-d H:i|after_or_equal:today',
            'people' => 'required|integer',
        ]);

        $pointOfInterest = PointOfInterest::find($validated['point_of_interest_id']);

        $timeLowerBound = Carbon::createFromFormat('Y-m-d H:i', $validated['date'])->subMinutes(10);
        $timeUpperBound = Carbon::createFromFormat('Y-m-d H:i', $validated['date'])->addMinutes(10);

        $reservations_in_range = Reservation::where('point_of_interest_id', $validated['point_of_interest_id'])
            ->where('date', '>=', $timeLowerBound)
            ->where('date', '<=', $timeUpperBound)
            ->get();

        $available = true;

        if ($reservations_in_range->count() >= $pointOfInterest->available_seats) {
            $available = false;
        };

        return response()->json([
            'available' => $available,
        ]);
    }

    public function filter(Request $request){
        $validated = $request->validate([
            'by'=>'required',
            'value'=>'required',
            'paginate'=>'required|integer'
        ]);

        if ($validated['by'] == 'all'){
            $users = Reservation::where('id', "LIKE", "%{$validated['value']}%")
                ->orWhere('point_of_interest_id', "LIKE", "%{$validated['value']}%")
                ->orWhere('date', "LIKE", "%{$validated['value']}%")
                ->orWhere('number_of_people', "LIKE", "%{$validated['value']}%")
                ->orWhere('created_at', "LIKE", "%{$validated['value']}%")
                ->orWhere('updated_at', "LIKE", "%{$validated['value']}%")
                ->paginate($validated['paginate']);
        } else {
            $users = Reservation::where($validated['by'], "LIKE", "%{$validated['value']}%")->paginate($validated['paginate']);
        }

        return ReservationResource::collection($users);
    }
}
