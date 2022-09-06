package com.techelevator.modelDto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SearchDTO {

    private long total;
    @JsonProperty("businesses")
    private RestaurantDTO[] restaurants;

    @Override
    public String toString() {
        String businesses = "Total: " + total + "\n";
        for(RestaurantDTO restaurant : this.restaurants) {
            businesses += restaurant.getName();
            businesses += "\n";
        }

        return businesses;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public RestaurantDTO[] getRestaurants() {
        return restaurants;
    }

    public void setRestaurants(RestaurantDTO[] restaurants) {
        this.restaurants = restaurants;
    }

    public SearchDTO(long total, RestaurantDTO[] businesses) {
        this.total = total;
        this.restaurants = businesses;
    }

    public SearchDTO() {
    }
}
