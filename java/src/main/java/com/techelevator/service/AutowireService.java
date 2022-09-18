package com.techelevator.service;

import com.techelevator.dao.event.EventDao;
import com.techelevator.dao.event.EventRestaurantDao;
import com.techelevator.dao.event.GuestDao;
import com.techelevator.dao.event.GuestVoteDao;
import com.techelevator.dao.restaurant.CategoryDao;
import com.techelevator.dao.restaurant.RestaurantCategoryDao;
import com.techelevator.dao.restaurant.RestaurantDao;
import com.techelevator.dao.restaurant.RestaurantHoursDao;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class AutowireService {

    @Autowired protected YelpBusinessService yelpBusinessService;

    @Autowired protected EventDao eventDao;
    @Autowired protected EventRestaurantDao eventRestaurantDao;

    @Autowired protected GuestDao guestDao;
    @Autowired protected GuestVoteDao guestVoteDao;

    @Autowired protected RestaurantDao restaurantDao;
    @Autowired protected CategoryDao categoryDao;
    @Autowired protected RestaurantCategoryDao restaurantCategoryDao;
    @Autowired protected RestaurantHoursDao restaurantHoursDao;

}
