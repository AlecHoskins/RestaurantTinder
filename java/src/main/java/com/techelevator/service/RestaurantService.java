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

    @Transactional
    public boolean addRestaurant(Restaurant restaurant) {
        if(restaurantDao.findRestaurantById(restaurant.getId()) != null) {
            return true;
        }

        if(restaurantDao.save(restaurant)) {
            for (Category category : restaurant.getCategories()) {
                long categoryId = categoryDao.getCategoryId(category.getAlias(), category.getTitle());

                if (categoryId == -1) {
                    categoryId = categoryDao.addCategory(category);
                }

                restaurantCategoryDao.addRestaurantCategory(restaurant.getId(), categoryId);
            }
            restaurantHoursDao.addAllHours(restaurant.getHours(), restaurant.getId());
            return true;
        }

        return false;
    }
}
