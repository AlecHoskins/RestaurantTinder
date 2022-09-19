package com.techelevator.service;

import com.techelevator.exception.DecisionDatePassedException;
import com.techelevator.exception.TransactionRollbackException;
import com.techelevator.model.event.Event;
import com.techelevator.model.event.Guest;
import com.techelevator.model.event.Vote;
import com.techelevator.model.restaurant.Restaurant;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class GuestService extends AutowiredService {

    public Guest getGuestByUrl(String url) {
        Guest guest = guestDao.getGuestByUrl(url);

        guest.setVote(guestVoteDao.getVotesByGuest(guest.getId()));

        return guest;
    }

    public Event getEvent(String url) {
        long id = getGuestByUrl(url).getEventId();
        Event event = eventDao.getEventById(id);

        List<Guest> guests = guestDao.getEventGuests(id);
        for(Guest guest : guests) {
            guest.setVote(guestVoteDao.getVotesByGuest(guest.getId()));
            guest.setInviteUrl(null); // DON'T LET THEM SEE IT
        }
        event.setGuestList(guests);

        List<Restaurant> restaurants = restaurantDao.getEventRestaurants(id);
        for(Restaurant restaurant : restaurants) {
            restaurant.setCategories(restaurantCategoryDao.getCategoriesByRestaurant(restaurant.getId()));
            restaurant.setHours(restaurantHoursDao.getHoursByRestaurant(restaurant.getId()));
        }
        event.setEventRestaurants(restaurants);

        return event;
    }

    @Transactional(rollbackFor = TransactionRollbackException.class)
    public void vote(Guest guest) throws TransactionRollbackException, DecisionDatePassedException {
        boolean pass;

        Event event = getEventById(guestDao.getGuestById(guest.getId()).getEventId());

        if(HelperService.isPastDeadline(event.getId(), eventDao)) {
            throw new DecisionDatePassedException();
        }

        for(Vote vote: guest.getVote()) {
            pass = guestVoteDao.updateVote(guest.getId(), vote);
            if (!pass) {
                throw new TransactionRollbackException("vote failed, rollback.");
            }
        }
    }

    private Event getEventById(long id) {
        return eventDao.getEventById(id);
    }

}
