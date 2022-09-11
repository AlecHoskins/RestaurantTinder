package com.techelevator.controller;

import com.techelevator.dao.restaurant.RestaurantDao;
import com.techelevator.model.restaurant.Restaurant;
import com.techelevator.service.RestaurantService;
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
    @Autowired
    private RestaurantService restaurantService;

    @GetMapping(path = "/{id}")
    public Restaurant getRestaurant(@PathVariable String id) {
        // TODO - refactor to call on a logic class which gets a completed restaurant model
        return restaurantDao.findRestaurantById(id);
    }

    @PostMapping
    public boolean test(@RequestBody Restaurant newRestaurant) {
        return restaurantService.addRestaurant(newRestaurant);
    }

}
