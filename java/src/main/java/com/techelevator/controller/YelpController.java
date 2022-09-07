package com.techelevator.controller;

import com.techelevator.modelDto.RestaurantDTO;
import com.techelevator.modelDto.SearchDTO;
import com.techelevator.service.YelpBusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class YelpController {
    @Autowired
    YelpBusinessService yelpBusinessService;

    //for testing
//    public static void main(String[] args) throws UnirestException {
//        YelpBusinessService yelpBusinessService = new YelpBusinessService();
////        yelpBusinessService.getBusinessesByTermAndLocation("vietnamese", "keller, tx");
////        yelpBusinessService.getBusinessById("MKHNbrsxdFAN7wGBGNcfTQ");
//
//        SearchDTO test = yelpBusinessService.searchYelp(83706);
//        RestaurantDTO restaurant = test.getBusinesses()[0];
//
//        System.out.println(restaurant);
//        System.out.println(restaurant.getCategories()[0]);
//        System.out.println(restaurant.getLocation());
//    }

    @GetMapping(path = "/yelp")
    public RestaurantDTO[] search(@RequestParam String term, @RequestParam String location) {
        SearchDTO search = yelpBusinessService.getBusinessesByTermAndLocation(term, location);
        return search.getRestaurants();
    }

    // the eventUnixTime addition allows the user to find restaurant that are open at the time of the event
    @GetMapping(path = "/yelp/time")
    public RestaurantDTO[] search(@RequestParam String term, @RequestParam String location, @RequestParam int eventUnixTime) {
        SearchDTO search = yelpBusinessService.getBusinessesByTermAndLocation(term, location, eventUnixTime);
        return search.getRestaurants();
    }

    @GetMapping(path = "/yelp/{id}")
    public RestaurantDTO restaurant(@PathVariable String id) {
        return yelpBusinessService.getBusinessById(id);
    }
    }