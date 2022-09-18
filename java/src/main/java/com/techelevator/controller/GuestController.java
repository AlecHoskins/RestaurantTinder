package com.techelevator.controller;

import com.techelevator.model.event.Event;
import com.techelevator.model.event.Guest;
import com.techelevator.service.GuestService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/guest")
public class GuestController {

    private final GuestService service;

    public GuestController(GuestService service) {
        this.service = service;
    }

    @GetMapping("/{url}")
    public Guest getGuest(@PathVariable String url) {
        return service.getGuestByUrl(url);
    }

    @GetMapping("/event/{url}")
    public Event getEvent(@PathVariable String url) {
        return service.getEvent(url);
    }

    @ResponseStatus(HttpStatus.ACCEPTED)
    @PutMapping(path = "/vote") // TODO : Check if we're past the deadline or not
    public void vote(@RequestBody Guest guest) {
        service.vote(guest);
    }

}
