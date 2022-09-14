package com.techelevator.service;

import com.techelevator.dao.event.EventDao;
import com.techelevator.model.event.Event;
import com.techelevator.model.restaurant.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    @Autowired
    private RestaurantService restaurantService;
    @Autowired
    private YelpBusinessService yelpBusinessService;
//    @Autowired
//    private Restaurant restaurant;

    @Autowired
    private EventDao eventDao;

    public Event getEvent(long id) {
        return eventDao.getEventById(id);
    }

    public List<Event> getEventsByHost(long id) {
        return eventDao.getEventsByHostId(id);
    }

    public boolean addEvent(Event newEvent) {
        for (Restaurant restaurant: newEvent.getEventRestaurants()) {
            boolean isAdded = restaurantService.addRestaurant(yelpBusinessService.getBusinessById(restaurant.getId()));
            if(!isAdded) {
                return false;
            }
        }

        long eventId = eventDao.addEvent(newEvent);

        return eventId > 0;
    }
}
