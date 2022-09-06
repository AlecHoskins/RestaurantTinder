package com.techelevator.controller;

import com.techelevator.modelDto.RestaurantDTO;
import com.techelevator.modelDto.SearchDTO;
import com.techelevator.service.YelpBusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
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

    @GetMapping(path = "/search")
    public RestaurantDTO[] search(@RequestParam String term, @RequestParam String location) {
        SearchDTO search = yelpBusinessService.getBusinessesByTermAndLocation(term, location);

        return search.getRestaurants();
    }


    @GetMapping(path = "/restaurant/{id}")
    public RestaurantDTO restaurant() {


        return null;
    }
}