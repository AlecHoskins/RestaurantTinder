package com.techelevator.controller;

import com.techelevator.modelDto.UrlDTO;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
//@PreAuthorize("isAuthenticated()")
public class Controller {

    @GetMapping()
    public UrlDTO getUrls() {
        return new UrlDTO();
    }

}
