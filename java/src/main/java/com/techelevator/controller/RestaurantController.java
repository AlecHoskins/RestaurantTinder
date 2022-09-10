package com.techelevator.controller;

import com.techelevator.dao.RestaurantDao;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
//@PreAuthorize("isAuthenticated()")
@RequestMapping(path = "/restaurant")
public class RestaurantController {

    private RestaurantDao restaurantDao;

    public RestaurantController(RestaurantDao restaurantDao) {
        this.restaurantDao = restaurantDao;
    }

//    public RestaurantDTO getRestaurantById() {
//
//    }

    public RestaurantController() {
    }

}
