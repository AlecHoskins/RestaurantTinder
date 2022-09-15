package com.techelevator.dao.event;

import com.techelevator.model.event.Guest;

import java.util.List;

public interface GuestDao {

    // Create
    boolean addGuest(Guest newGuest, long eventId);

    // Read
    Guest getGuestById(long id);
    List<Guest> getEventGuests(long eventId);

    // Update
    boolean updateGuest(Guest updatedGuest);

    // Delete
    boolean delete(long id);

}
