package com.techelevator.service;

import com.techelevator.dao.event.GuestDao;
import com.techelevator.model.event.Guest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

public class UserService {

    @Autowired GuestDao guestDao;

    @Transactional(rollbackFor = TransactionRollbackException.class)
    public Guest updateUserId(long id, String url) throws TransactionRollbackException {
        Guest guest = guestDao.getGuestByUrl(url);
        guest.setUserId(id);

        boolean isUpdated = guestDao.updateGuest(guest);
        if(!isUpdated) {
            throw new TransactionRollbackException();
        }

        return guest;
    }

}
