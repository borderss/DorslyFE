<?php

namespace App\ModelFilters;

use Carbon\Carbon;
use EloquentFilter\ModelFilter;

class PointOfInterestFilter extends ModelFilter
{
    /**
    * Related Models that have ModelFilters as well as the method on the ModelFilter
    * As [relationMethod => [input_key1, input_key2]].
    *
    * @var array
    */
    public $relations = [];

    public function sort($order)
    {
        $this->orderBy($order[0], $order[1]);
    }

    public function name($name)
    {
        return $this->where('name', 'ilike', "%$name%");
    }

    public function country($country)
    {
        return $this->where('country', 'ilike', "%$country%");
    }

    public function date($dateTime)
    {
        $time = Carbon::createFromDate($dateTime)->format('H:i:s');

        return $this->where(function ($query) use ($time) {
            $query->where('is_open_round_the_clock', true)
                ->orWhere([
                    ['opens_at', '<=', $time],
                    ['closes_at', '>', $time]
                ]);
        })->get();
    }

    public function open($open)
    {
        return $this->where('is_open_round_the_clock', $open);
    }

    public function location($location)
    {
        return $this->where('is_on_location', $location);
    }

    public function seats($seats)
    {
        return $this->where('available_seats', '>=', $seats);
    }

    public function review($review)
    {
        return $this->where('review_count', $review);
    }
}
