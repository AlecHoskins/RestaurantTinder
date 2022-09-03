package com.techelevator.controller;

import com.techelevator.model.UrlDTO;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class Controller {

    @GetMapping()
    public UrlDTO getUrls() {
        return new UrlDTO();
    }

}
