package com.techelevator.controller;

import com.techelevator.model.restaurant.Restaurant;
import com.techelevator.dto.SearchDTO;
import com.techelevator.service.YelpBusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/yelp")
@PreAuthorize("isAuthenticated()")
public class YelpController {
    @Autowired
    YelpBusinessService yelpBusinessService;

    @GetMapping()
    public Restaurant[] search( // TODO : check if restaurant is permanently closed.
            @RequestParam (defaultValue = "restaurant") String term,
            @RequestParam (defaultValue = "78229") String location
    ) {
        return yelpBusinessService.getBusinessesByTermAndLocation(term, location).getRestaurants();
    }

    @GetMapping(path = "/{id}")
    public Restaurant restaurant(@PathVariable String id) {
        return yelpBusinessService.getBusinessById(id);
    }

}