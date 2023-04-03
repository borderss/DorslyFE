<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DealsRequest;
use App\Http\Resources\DealsResourse;
use App\Http\Resources\FilterDealsResource;
use App\Http\Resources\FilterPrePurchasesResource;
use App\Http\Resources\FilterReservationsResource;
use App\Models\Deal;
use App\Models\PrePurchase;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Stripe\StripeClient;

class DealsController extends Controller
{
    private function updateDealStatus($deal)
    {
        $stripe = new StripeClient(config('app.stripe_secret'));
        $reservation = Reservation::find($deal->reservation_id);

        if ($deal->pre_purchase_id !== null) {
            $pre_purchase = PrePurchase::find($deal->pre_purchase_id);

            if ($pre_purchase->payment_id !== null) {
                $session = $stripe->checkout->sessions->retrieve($pre_purchase->payment_id);

                $pre_purchase->update(['status' => $session->status]);
            }
        }

        if ($reservation->date < now()) {
            if(PrePurchase::find($deal->pre_purchase_id)?->status == 'payment_failed'){
                $deal->update(['status' => 'payment expired']);
            } else {
                $deal->update(['status' => 'completed']);
            }
        }
    }

    public function getDeals()
    {
        $deals = Deal::where('user_id', auth()->user()->id)->get();

        if ($deals->count() > 0) {
            foreach ($deals as $deal) {
                $this->updateDealStatus($deal);
            }
        }

        $deals = Deal::where('user_id', auth()->user()->id)->get();

        return DealsResourse::collection($deals)->sortByDesc('created_at');
    }

    public function getDealFromPointOfInterest($id)
    {
        $deal = Deal::where('user_id', auth()->user()->id)
            ->where('status', 'active')
            ->WhereHas('reservation', function ($query) use ($id) {
                $query->where('point_of_interest_id', $id);
            })
            ->get();

        return DealsResourse::collection($deal);
    }

    public function createDeal(Request $request)
    {
        $validated = $request->validate([
            'point_of_interest_id' => 'required|integer',
            'date' => 'required|date_format:Y-m-d H:i|after_or_equal:today',
            'people' => 'required|integer',
        ]);

        $activeDeals = Deal::where('user_id', auth()->user()->id)
            ->where('status', 'active')
            ->WhereHas('reservation', function ($query) use ($validated) {
                $query->where('point_of_interest_id', $validated['point_of_interest_id']);
            })
            ->get();

        if ($activeDeals->count() > 0) {
            return response()->json([
                'message' => 'You already have an active deal here.',
            ], 400);
        }

        $availability = (new ReservationController)->reservationAvailable($request)->getData();

        if ($availability->available === false) {
            return response()->json([
                'message' => 'Reservation could not be created: ' . $availability->reason,
            ], 400);
        }

        $reservation = Reservation::create([
            'point_of_interest_id' => $validated['point_of_interest_id'],
            'date' => $validated['date'],
            'number_of_people' => $validated['people'],
        ]);

        $deal = Deal::create([
            'user_id' => auth()->user()->id,
            'point_of_interest_id' => $reservation->point_of_interest_id,
            'reservation_id' => $reservation->id,
            'pre_purchase_id' => null,
            'status' => 'active',
        ]);

        return new DealsResourse($deal);
    }

    public function delete($id)
    {
        $deal = Deal::find($id);

        if (!$deal) {
            return response()->json([
                'message' => 'Deal not found.',
            ], 400);
        }

        if ($deal->user_id !== auth()->user()->id) {
            return response()->json([
                'status' => 'error',
                'message' => 'You are not allowed to delete this deal.',
            ]);
        }

        $deal->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Deal deleted successfully.',
        ]);
    }

    public function cancelReservation($id)
    {
        $deal = Deal::find($id);

        if (!$deal) {
            return response()->json([
                'status' => 'error',
                'message' => 'Deal not found.',
            ], 400);
        }

        if ($deal->user_id !== auth()->user()->id) {
            return response()->json([
                'status' => 'error',
                'message' => 'You are not allowed to cancel this reservation.',
            ], 400);
        }

        if ($deal->status !== 'active') {
            return response()->json([
                'status' => 'error',
                'message' => 'You can only cancel active reservations.',
            ], 400);
        }

        $deal->status = 'cancelled';
        $deal->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Reservation cancelled successfully.',
        ]);
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
            $users = Deal::where('id', "LIKE", "%{$validated['value']}%")
                ->orWhere('user_id', "LIKE", "%{$validated['value']}%")
                ->orWhere('reservation_id', "LIKE", "%{$validated['value']}%")
                ->orWhere('pre_purchase_id', "LIKE", "%{$validated['value']}%")
                ->orWhere('status', "LIKE", "%{$validated['value']}%")
                ->orWhere('created_at', "LIKE", "%{$validated['value']}%")
                ->orWhere('updated_at', "LIKE", "%{$validated['value']}%")
                ->paginate($validated['paginate']);
        } else {
            $users = Deal::where($validated['by'], "LIKE", "%{$validated['value']}%")->paginate($validated['paginate']);
        }

        return FilterDealsResource::collection($users);
    }

    public function filterReservations(Request $request)
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

        return FilterReservationsResource::collection($users);
    }

    public function filterPrePurchases(Request $request)
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
            $users = PrePurchase::where('id', "LIKE", "%{$validated['value']}%")
                ->orWhere('point_of_interest_id', "LIKE", "%{$validated['value']}%")
                ->orWhere('total_price', "LIKE", "%{$validated['value']}%")
                ->orWhere('status', "LIKE", "%{$validated['value']}%")
                ->orWhere('payment_status', "LIKE", "%{$validated['value']}%")
                ->orWhere('payment_id', "LIKE", "%{$validated['value']}%")
                ->orWhere('created_at', "LIKE", "%{$validated['value']}%")
                ->orWhere('updated_at', "LIKE", "%{$validated['value']}%")
                ->paginate($validated['paginate']);
        } else {
            $users = PrePurchase::where($validated['by'], "LIKE", "%{$validated['value']}%")->paginate($validated['paginate']);
        }

        return FilterPrePurchasesResource::collection($users);
    }
}
