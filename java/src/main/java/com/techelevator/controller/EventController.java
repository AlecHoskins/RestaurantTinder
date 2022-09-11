package com.techelevator.controller;


import com.techelevator.dao.event.JdbcEventDao;
import com.techelevator.model.event.Event;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/event")
//@PreAuthorize("isAuthenticated()")
public class EventController {


    private final JdbcEventDao eventDao;

    public EventController(JdbcEventDao eventDao) {
        this.eventDao = eventDao;
    }

    @GetMapping("/{id}")
    public Event getEvent(@PathVariable long id) {
        return eventDao.getEventById(id);
    }

    @GetMapping("/host/{id}")
    public List<Event> getEventsByHost(@PathVariable long id) {
        return eventDao.getEventByUserId(id);
    }

    @PostMapping
    public void addEvent(@RequestBody Event event) {
        try {
            eventDao.addEvent(event);
        } catch (ResourceAccessException e) {
            System.err.println("We are having some trouble with creating your event. Please try again.");
        }
    }
}
