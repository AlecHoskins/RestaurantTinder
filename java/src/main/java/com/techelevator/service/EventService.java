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
import com.techelevator.model.restaurant.Category;
import com.techelevator.model.restaurant.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class EventService {

    @Autowired
    private YelpBusinessService yelpBusinessService;

    @Autowired
    private EventDao eventDao;
    @Autowired
    private GuestDao guestDao;
    @Autowired
    private GuestVoteDao guestVoteDao;
    @Autowired
    private EventRestaurantDao eventRestaurantDao;
    @Autowired
    private RestaurantDao restaurantDao;
    @Autowired
    private CategoryDao categoryDao;
    @Autowired
    private RestaurantCategoryDao restaurantCategoryDao;
    @Autowired
    private RestaurantHoursDao restaurantHoursDao;

    public Event getEvent(long id) {
        Event event = eventDao.getEventById(id);

        List<Guest> guests = guestDao.getEventGuests(id);
        for(Guest guest : guests) {
            guest.setVote(guestVoteDao.getVotesByGuest(guest.getId()));
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

    public List<Event> getEventsByHost(long id) {
        return eventDao.getEventsByHostId(id);
    }

    @Transactional
    public Event addEvent(Event newEvent) {
        long eventId = eventDao.addEvent(newEvent);

        for (Restaurant restaurant: newEvent.getEventRestaurants()) {
            // TODO : check if restaurant hours already exists
            boolean isAdded = addRestaurant(yelpBusinessService.getBusinessById(restaurant.getId()));
            if(isAdded) {
                isAdded = eventRestaurantDao.addEventRestaurant(eventId, restaurant.getId());
            }
            if(!isAdded) {
                return null; // TODO : check rollback
            }
        }

        for (Guest guest : newEvent.getGuestList()) {
            long id = addGuest(guest, eventId);
            if(id < 0) {
                return null; // TODO : check rollback
            }
        }

        return getEvent(eventId);
    }

    @Transactional
    public boolean addRestaurant(Restaurant restaurant) {
        if(restaurantDao.findRestaurantById(restaurant.getId()) != null) {
            return true;
        }

        if(restaurantDao.save(restaurant)) {
            for (Category category : restaurant.getCategories()) {
                long categoryId = categoryDao.getCategoryId(category.getAlias(), category.getTitle());

                if (categoryId == -1) {
                    categoryId = categoryDao.addCategory(category);
                }

                restaurantCategoryDao.addRestaurantCategory(restaurant.getId(), categoryId);
            }
            restaurantHoursDao.addAllHours(restaurant.getHours(), restaurant.getId());
            return true;
        }

        return false;
    }

    @Transactional
    public long addGuest(Guest guest, long eventId) {
        long guestId = guestDao.addGuest(guest, eventId);

        // TODO : generate guest URL & update database

        if(guestId > 0) {

            Event event = getEvent(eventId);
            List<Restaurant> restaurants = event.getEventRestaurants();

            for(Restaurant restaurant : restaurants) {
                boolean isAdded = guestVoteDao.addGuestVote(guestId, restaurant.getId());
                if(!isAdded) {
                    return -1;
                }
            }
        }

        return guestId;
    }

}
