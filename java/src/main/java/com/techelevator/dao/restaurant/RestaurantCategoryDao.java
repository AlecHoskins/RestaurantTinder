package com.techelevator.dao.restaurant;

import com.techelevator.model.restaurant.Category;

import java.util.List;

public interface RestaurantCategoryDao {

    // Create
    boolean addRestaurantCategory(String restaurantId, long categoryId);

    // Read
    List<Category> getCategoriesByRestaurant(String restaurantId);

    // Update n/a

    // Delete
    boolean delete(String restaurantId, long categoryId);

}
