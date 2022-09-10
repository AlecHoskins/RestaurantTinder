package com.techelevator.controller;

import com.techelevator.dao.restaurant.RestaurantDao;
import com.techelevator.model.restaurant.Restaurant;
import org.apache.coyote.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
//@PreAuthorize("isAuthenticated()")
@RequestMapping(path = "/restaurant")
public class RestaurantController {

    @Autowired
    private RestaurantDao restaurantDao;

    public RestaurantController(RestaurantDao restaurantDao) {
        this.restaurantDao = restaurantDao;
    }

//    public RestaurantDTO getRestaurantById() {
//
//    }

    @GetMapping(path = "/{id}")
    public Restaurant getRestaurant(@PathVariable String id) {
        return restaurantDao.findRestaurantById(id);
    }

    @PostMapping
    public boolean test(@RequestBody Restaurant newRestaurant) {

        return restaurantDao.save(newRestaurant);

    }

    public RestaurantController() {
    }

}
