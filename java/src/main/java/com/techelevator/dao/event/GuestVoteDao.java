package com.techelevator.dao.event;

import com.techelevator.model.event.Vote;

import java.util.List;

public interface GuestVoteDao {

    // Create
    boolean addGuestVote(long guestId, String restaurantId);

    // Read
    List<Vote> getVotesByGuest(long guestId);
    List<Vote> getVotesByRestaurant(String restaurantId, long eventId);
    List<Vote> getVotesByEvent(long eventId);

    // Update
    boolean updateVote(long guestId, Vote updatedVote);

    // Delete
    boolean delete(long guestId, String restaurantId);

}
