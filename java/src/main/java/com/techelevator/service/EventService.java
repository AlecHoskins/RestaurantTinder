package com.techelevator.service;

import com.techelevator.dao.event.EventDao;
import com.techelevator.model.event.Event;
import com.techelevator.model.restaurant.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    private RestaurantService restaurantService;
    private Restaurant restaurant;

    @Autowired
    private EventDao eventDao;

    public Event getEvent(long id) {
        return eventDao.getEventById(id);
    }

    public List<Event> getEventsByHost(long id) {
        return eventDao.getEventsByHostId(id);
    }

    public boolean addEvent(Event newEvent) {
        eventDao.addEvent(newEvent);
        return false;
    }
}
