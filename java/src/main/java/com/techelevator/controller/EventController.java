package com.techelevator.controller;

import com.techelevator.dto.FinalistDTO;
import com.techelevator.model.event.Event;
import com.techelevator.model.restaurant.Restaurant;
import com.techelevator.service.EventService;
import com.techelevator.service.RestaurantService;
import com.techelevator.service.TransactionRollbackException;
import com.techelevator.service.YelpBusinessService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.util.ArrayList;
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

    @GetMapping("/user/{id}")
    public List<Event> getEventsByUser(@PathVariable long id) {
        return service.getEventsByUser(id);
    }

    @GetMapping("/finalists")
    public List<FinalistDTO> getFinalists() {
        return service.getFinalists();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Event addEvent(@RequestBody Event newEvent) {
        return service.addEvent(newEvent);
    }

}
