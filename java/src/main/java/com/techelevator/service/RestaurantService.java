package com.techelevator.service;

import com.techelevator.dao.restaurant.CategoryDao;
import com.techelevator.dao.restaurant.RestaurantCategoryDao;
import com.techelevator.dao.restaurant.RestaurantDao;
import com.techelevator.dao.restaurant.RestaurantHoursDao;
import com.techelevator.model.restaurant.Category;
import com.techelevator.model.restaurant.Day;
import com.techelevator.model.restaurant.Hours;
import com.techelevator.model.restaurant.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RestaurantService { // TODO : DELETE RestaurantService

//    private Category category;
//    private Day day;
//
//    @Autowired
//    private RestaurantDao restaurantDao;
//    @Autowired
//    private RestaurantCategoryDao restaurantCategoryDao;
//    @Autowired
//    private RestaurantHoursDao restaurantHoursDao;
//    @Autowired
//    private CategoryDao categoryDao;
//
//
//    public Restaurant getRestaurant(String id) {
//        return restaurantDao.findRestaurantById(id);
//    }
//
//    public List<Restaurant> getRestaurantsByEvent() {
//        return null;
//    }


}
