<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DealsRequest;
use App\Http\Resources\DealsResourse;
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

        if ($reservation->date < now()) {
            $deal->status = 'completed';
            $deal->save();
            return false;
        }

        if ($deal->pre_purchase_id !== null) {
            $pre_purchase = PrePurchase::find($deal->pre_purchase_id);

            if ($pre_purchase->payment_id !== null) {
                $session = $stripe->checkout->sessions->retrieve($pre_purchase->payment_id);

                if ($pre_purchase && $session->status === 'complete' && $pre_purchase->status !== 'complete') {
                    $pre_purchase->status = 'complete';
                    $pre_purchase->save();
                    return false;
                }
            }
        }

        return true;
    }

    public function getDeals()
    {
        $deals = Deal::where('user_id', auth()->user()->id)->get();

        if ($deals->count() > 0) {
            foreach ($deals as $deal) {
                $this->updateDealStatus($deal);
            }
        }

        return DealsResourse::collection($deals);
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

        if (!(new ReservationController)->reservationAvailable($request)->original['available']) {
            return response()->json([
                'message' => 'Reservation could not be created.',
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
                ->orWhere('reservation_id', "LIKE", "%{$validated['value']}%")
                ->orWhere('pre_purchase_id', "LIKE", "%{$validated['value']}%")
                ->orWhere('status', "LIKE", "%{$validated['value']}%")
                ->orWhere('created_at', "LIKE", "%{$validated['value']}%")
                ->orWhere('updated_at', "LIKE", "%{$validated['value']}%")
                ->paginate($validated['paginate']);
        } else {
            $users = Deal::where($validated['by'], "LIKE", "%{$validated['value']}%")->paginate($validated['paginate']);
        }

        return DealsResourse::collection($users);
    }
}
