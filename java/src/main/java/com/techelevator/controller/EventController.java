package com.techelevator.controller;

import com.techelevator.dto.VoteTallyDTO;
import com.techelevator.model.event.Event;
import com.techelevator.service.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/event")
@PreAuthorize("isAuthenticated()")
public class EventController {

    private final EventService service;

    public EventController(EventService service) {
        this.service = service;
    }

    @GetMapping("/{eventId}") // TODO : only host?
    public Event getEvent(@PathVariable long eventId, Principal principal) {
        service.checkEventAccess(eventId, principal);
        return service.getEvent(eventId);
    }

    @GetMapping("/host/{hostId}")
    public List<Event> getEventsByHost(@PathVariable long hostId, Principal principal) {
        service.confirmId(hostId, principal);
        return service.getEventsByHost(hostId);
    }

    @GetMapping("/user/{userId}")
    public List<Event> getEventsByUser(@PathVariable long userId, Principal principal) {
        service.confirmId(userId, principal);
        return service.getEventsByUser(userId);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Event addEvent(@RequestBody Event newEvent, Principal principal) {
        service.confirmId(newEvent.getHostId(), principal);
        return service.addEvent(newEvent);
    }

}
