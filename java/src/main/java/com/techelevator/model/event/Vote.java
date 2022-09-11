package com.techelevator.model.event;

public class Vote {

    private String restaurantId;
    private Boolean upVote;

    public String getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(String restaurantId) {
        this.restaurantId = restaurantId;
    }

    public Boolean getUpVote() {
        return upVote;
    }

    public void setUpVote(Boolean upVote) {
        this.upVote = upVote;
    }

    public Vote(String restaurantId, Boolean upVote) {
        this.restaurantId = restaurantId;
        this.upVote = upVote;
    }

    public Vote() {
    }
}
