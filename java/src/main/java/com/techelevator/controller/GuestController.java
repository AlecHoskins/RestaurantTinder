package com.techelevator.controller;

import com.techelevator.model.event.Event;
import com.techelevator.model.event.Guest;
import com.techelevator.model.event.Vote;
import com.techelevator.service.GuestService;
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

    @PutMapping(path = "/{url}")
//    @ResponseStatus() TODO : implement response statuses
    public void vote(@PathVariable String url, @RequestBody Vote vote) {
        service.vote(url, vote);
    }

}
