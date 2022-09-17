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
//@PreAuthorize("isAuthenticated()")
public class YelpController {
    @Autowired
    YelpBusinessService yelpBusinessService;

    @GetMapping()
    public Restaurant[] search(
            @RequestParam (defaultValue = "restaurant") String term,
            @RequestParam (defaultValue = "78229") String location,
            @RequestParam (defaultValue = "-1") int eventUnixTime
    ) {
        SearchDTO search = yelpBusinessService.getBusinessesByTermAndLocation(term, location, eventUnixTime);

        if(search == null) return null;

        return search.getRestaurants();
    }

    @GetMapping(path = "/{id}")
    public Restaurant restaurant(@PathVariable String id) {
        return yelpBusinessService.getBusinessById(id);
    }

}