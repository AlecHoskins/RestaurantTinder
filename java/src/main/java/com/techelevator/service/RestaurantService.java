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

import java.util.List;

@Service
public class RestaurantService {

    private Category category;
    private Day day;

    @Autowired
    private RestaurantDao restaurantDao;
    @Autowired
    private RestaurantCategoryDao restaurantCategoryDao;
    @Autowired
    private RestaurantHoursDao restaurantHoursDao;
    @Autowired
    private CategoryDao categoryDao;


    public Restaurant getRestaurant(String id) {
        return restaurantDao.findRestaurantById(id);
    }

    // TODO - WIP
    public List<Restaurant> getRestaurantsByEvent() {
        return null;
    }

    public boolean addRestaurant(Restaurant restaurant) {

        restaurantDao.save(restaurant);

        for (Category category: restaurant.getCategories()) {
            categoryDao.addCategory(category);
        }
        restaurantHoursDao.addAllHours(restaurant.getHours(), restaurant.getId());
        return false;
    }
}
