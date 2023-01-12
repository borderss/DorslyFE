<?php

namespace App\ModelFilters;

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

    public function sort($order){
        $this->orderBy($order[0],$order[1]);
    }

    public function name($name){
        return $this->whereLike('name',$name);
    }

    public function country($country){
        return $this->whereLike('country',$country);
    }

    public function jobtime($jobtime){
        $this->where('opens_at','<=',$jobtime)
        ->where('closes_at','>',$jobtime);
    }

    public function open($open){
        return $this->where('is_open_round_the_clock',$open);
    }

    public function location($location){
        return $this->where('is_on_location',$location);
    }

    public function seats($seats){
        return $this->where('available_seats',$seats);
    }

    public function review($review){
        return $this->where('review_count',$review);
    }


}
