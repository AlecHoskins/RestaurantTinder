package com.techelevator.controller;

import com.techelevator.dto.VoteTallyDTO;
import com.techelevator.model.event.Event;
import com.techelevator.service.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{id}") // TODO : only host?
    public Event getEvent(@PathVariable long id) {
        return service.getEvent(id);
    }

    @GetMapping("/host/{id}")
    public List<Event> getEventsByHost(@PathVariable long id) {
        return service.getEventsByHost(id);
    }

    @GetMapping("/user/{id}")
    public List<Event> getEventsByUser(@PathVariable long id) {
        return service.getEventsByUser(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Event addEvent(@RequestBody Event newEvent) {
        return service.addEvent(newEvent);
    }

}
