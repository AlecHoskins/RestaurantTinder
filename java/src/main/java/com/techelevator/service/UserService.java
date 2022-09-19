package com.techelevator.service;

import com.techelevator.dao.event.GuestDao;
import com.techelevator.exception.TransactionRollbackException;
import com.techelevator.model.User;
import com.techelevator.model.event.Guest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;

@Service
public class UserService extends AutowiredService {

    @Transactional(rollbackFor = TransactionRollbackException.class)
    public Guest updateUserId(String url, Principal principal) throws TransactionRollbackException {
        User user = userDao.findByUsername(principal.getName());
        Guest guest = guestDao.getGuestByUrl(url);
        if(guest == null) {
            throw new TransactionRollbackException("updateUserId failed, rollback.");
        }
        guest.setUserId(user.getId());

        boolean isUpdated = guestDao.updateGuest(guest);
        if(!isUpdated) {
            throw new TransactionRollbackException("updateUserId failed, rollback.");
        }

        return guest;
    }

}
