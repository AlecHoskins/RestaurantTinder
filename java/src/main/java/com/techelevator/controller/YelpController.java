package com.techelevator.controller;

import com.techelevator.modelDto.RestaurantDTO;
import com.techelevator.modelDto.SearchDTO;
import com.techelevator.service.YelpBusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
//@PreAuthorize("isAuthenticated()")
public class YelpController {
    @Autowired
    YelpBusinessService yelpBusinessService;

    // the eventUnixTime addition allows the user to find restaurant that are open at the time of the event
    @GetMapping(path = "/yelp")
    public RestaurantDTO[] search(
            @RequestParam (defaultValue = "restaurant") String term,
            @RequestParam (defaultValue = "") String location,
            @RequestParam (defaultValue = "-1") int eventUnixTime
    ) {
        SearchDTO search = yelpBusinessService.getBusinessesByTermAndLocation(term, location, eventUnixTime);

        if(search == null) return null;

        return search.getRestaurants();
    }

    @GetMapping(path = "/yelp/{id}")
    public RestaurantDTO restaurant(@PathVariable String id) {
        return yelpBusinessService.getBusinessById(id);
    }

}