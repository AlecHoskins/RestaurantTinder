package com.techelevator.controller;

import com.techelevator.model.event.Event;
import com.techelevator.service.EventService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/event")
//@PreAuthorize("isAuthenticated()")
public class EventController {

    private final EventService service;

    public EventController(EventService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public Event getEvent(@PathVariable long id) {
        return service.getEvent(id);
    }

    @GetMapping("/host/{id}")
    public List<Event> getEventsByHost(@PathVariable long id) {
        return service.getEventsByHost(id);
    }

    @PostMapping
    public boolean addEvent(@RequestBody Event newEvent) {
        return service.addEvent(newEvent);
    }

}
