package com.techelevator.service;

import com.techelevator.dao.event.EventDao;
import com.techelevator.dao.event.EventRestaurantDao;
import com.techelevator.dao.event.GuestDao;
import com.techelevator.dao.event.GuestVoteDao;
import com.techelevator.dao.restaurant.CategoryDao;
import com.techelevator.dao.restaurant.RestaurantCategoryDao;
import com.techelevator.dao.restaurant.RestaurantDao;
import com.techelevator.dao.restaurant.RestaurantHoursDao;
import com.techelevator.exception.DecisionDatePassedException;
import com.techelevator.exception.TransactionRollbackException;
import com.techelevator.model.event.Event;
import com.techelevator.model.event.Guest;
import com.techelevator.model.event.Vote;
import com.techelevator.model.restaurant.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class GuestService {

    @Autowired private EventDao eventDao;
    @Autowired private EventRestaurantDao eventRestaurantDao;

    @Autowired private GuestDao guestDao;
    @Autowired private GuestVoteDao guestVoteDao;

    @Autowired private RestaurantDao restaurantDao;
    @Autowired private CategoryDao categoryDao;
    @Autowired private RestaurantCategoryDao restaurantCategoryDao;
    @Autowired private RestaurantHoursDao restaurantHoursDao;


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
