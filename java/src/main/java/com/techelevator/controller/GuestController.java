package com.techelevator.controller;

import com.techelevator.model.event.Event;
import com.techelevator.model.event.Guest;
import com.techelevator.model.event.Vote;
import com.techelevator.service.GuestService;
import com.techelevator.service.TransactionRollbackException;
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

    @PutMapping(path = "/vote")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void vote(@RequestBody Guest guest) {
//        try {
//
//        } catch (TransactionRollbackException e) {
//            System.out.println("GuestController exception: " + e.getMessage());
//        }

        service.vote(guest);
    }

}
