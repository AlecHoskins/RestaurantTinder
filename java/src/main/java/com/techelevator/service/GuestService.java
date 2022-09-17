package com.techelevator.service;

import com.techelevator.dao.event.EventDao;
import com.techelevator.dao.event.EventRestaurantDao;
import com.techelevator.dao.event.GuestDao;
import com.techelevator.dao.event.GuestVoteDao;
import com.techelevator.dao.restaurant.CategoryDao;
import com.techelevator.dao.restaurant.RestaurantCategoryDao;
import com.techelevator.dao.restaurant.RestaurantDao;
import com.techelevator.dao.restaurant.RestaurantHoursDao;
import com.techelevator.model.event.Event;
import com.techelevator.model.event.Guest;
import com.techelevator.model.event.Vote;
import com.techelevator.model.restaurant.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

//        System.out.println(guest);

        guest.setVote(guestVoteDao.getVotesByGuest(guest.getId()));

//        System.out.println(guest);

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

    public Guest updateUserId(long id) {
        // TODO : implement updateUserId
        return null;
    }

    public boolean vote(String url, Vote updatedVote) {
        return guestVoteDao.updateVote(getGuestByUrl(url).getId(), updatedVote);
    }
}
