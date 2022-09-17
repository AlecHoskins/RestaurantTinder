package com.techelevator.dto;

import com.techelevator.model.event.Event;
import com.techelevator.model.restaurant.Restaurant;

import java.util.List;

public class FinalistDTO implements Comparable {

    private Restaurant restaurant;
    private int upVotes;

    @Override
    public int compareTo(Object o) {
        FinalistDTO e = ((FinalistDTO)o); // type cast
        return (e.getUpVotes()) - this.getUpVotes();
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public int getUpVotes() {
        return upVotes;
    }

    public void setUpVotes(int upVotes) {
        this.upVotes = upVotes;
    }

    public FinalistDTO(Restaurant restaurant, int upVotes) {
        this.restaurant = restaurant;
        this.upVotes = upVotes;
    }

    public FinalistDTO() {
    }
}
