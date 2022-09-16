package com.techelevator.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@CrossOrigin
//@PreAuthorize("isAuthenticated()")
public class UserController {

    public UserController() {
    }

    @GetMapping(path = "username")
    public String getUsername(Principal principal) {
        return "Username: " + principal.getName();
    }

//    @GetMapping(path = "/users")
//    public String getUsers(Principal principal) {
//        return "Username: " + principal.getName();
//    }

}
