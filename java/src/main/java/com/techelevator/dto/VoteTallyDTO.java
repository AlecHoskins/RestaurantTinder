package com.techelevator.dto;

public class VoteTallyDTO implements Comparable {

    private String restaurantId;
    private int upVotes;

    @Override
    public int compareTo(Object o) {
        VoteTallyDTO e = ((VoteTallyDTO)o); // type cast
        return (e.getUpVotes()) - this.getUpVotes();
    }

    public String getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(String restaurantId) {
        this.restaurantId = restaurantId;
    }

    public int getUpVotes() {
        return upVotes;
    }

    public void setUpVotes(int upVotes) {
        this.upVotes = upVotes;
    }

    public VoteTallyDTO(String restaurantId, int upVotes) {
        this.restaurantId = restaurantId;
        this.upVotes = upVotes;
    }

    public VoteTallyDTO() {
    }
}
