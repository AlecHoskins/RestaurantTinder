package com.techelevator.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.techelevator.model.restaurant.Restaurant;

public class SearchDTO {

    private long total;
    @JsonProperty("businesses")
    private Restaurant[] restaurants;

    @Override
    public String toString() {
        String businesses = "Total: " + total + "\n";
        for(Restaurant restaurant : this.restaurants) {
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

    public Restaurant[] getRestaurants() {
        return restaurants;
    }

    public void setRestaurants(Restaurant[] restaurants) {
        this.restaurants = restaurants;
    }

    public SearchDTO(long total, Restaurant[] businesses) {
        this.total = total;
        this.restaurants = businesses;
    }

    public SearchDTO() {
    }
}
