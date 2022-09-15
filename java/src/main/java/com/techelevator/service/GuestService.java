package com.techelevator.service;

import com.techelevator.dao.event.GuestDao;
import com.techelevator.model.event.Guest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GuestService {

    @Autowired
    private GuestDao guestDao;

    public boolean addGuest(Guest guest, long eventId) {
        return guestDao.addGuest(guest, eventId);
    }

    public Guest getGuestById(long id) {
        return guestDao.getGuestById(id);
    }

    public List<Guest> getGuestsByEvent(long id) {
        return guestDao.getEventGuests(id);
    }
}
