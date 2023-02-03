<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PointOfInterest;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function reservationAvailable(Request $request)
    {
        $validated = $request->validate([
            'point_of_interest_id' => 'required|integer',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'people' => 'required|integer',
        ]);

        $point_of_interest = PointOfInterest::find($validated['point_of_interest_id']);

        if ($point_of_interest->is_open_round_the_clock) {
            $reservations = Reservation::where('point_of_interest_id', $validated['point_of_interest_id'])
                ->where('date', $validated['date'])
                ->get();
        } else {
            $reservations = Reservation::where('point_of_interest_id', $validated['point_of_interest_id'])
                ->where('date', $validated['date'])
                ->where('opens_at', '<', $validated['time'])
                ->where('closes_at', '>', $validated['time'])
                ->get();
        }

        $available = true;

        if ($reservations->count() >= $point_of_interest->max_people) {
            $available = false;
        }

        return response()->json([
            'available' => $available,
        ]);
    }

}
