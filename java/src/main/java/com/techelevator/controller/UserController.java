package com.techelevator.controller;

import com.techelevator.model.event.Guest;
import com.techelevator.service.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@CrossOrigin
@PreAuthorize("isAuthenticated()")
@RequestMapping("/user")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping()
    public String getUsername(Principal principal) {
        return "Username: " + principal.getName();
    }

    @PutMapping("/guest/{url}")
    public Guest addGuestToUser(@PathVariable String url, Principal principal) {
        return service.updateUserId(url, principal);
    }

}
