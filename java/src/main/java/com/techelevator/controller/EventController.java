package com.techelevator.controller;


import com.techelevator.dao.JdbcEventDao;
import com.techelevator.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

@RestController
@CrossOrigin
@RequestMapping("/event")
public class EventController {

    @Autowired
    private final JdbcEventDao eventDao;

    public EventController(JdbcEventDao eventDao) {
        this.eventDao = eventDao;
    }

    @GetMapping("/{id}")
    public Event getEvent(@PathVariable long id) {
        return eventDao.getEventById(id);
    }

    @GetMapping("/host/{id}")
    public Event getEventByHost(@PathVariable long id) {
        return eventDao.getEventByUserId(id);
    }

    @PutMapping
    public void addEvent(@RequestBody Event event) {
        try {
            eventDao.addEvent(event);
        } catch (ResourceAccessException e) {
            System.err.println("We are having some trouble with creating your event. Please try again.");
        }
    }
}
