package com.techelevator.dao.restaurant;

import com.techelevator.model.restaurant.Restaurant;

import java.util.List;

public interface RestaurantDao {

    // Create
    boolean save(Restaurant newRestaurant);

    // Read
    Restaurant findRestaurantById(String id);

    // Update
    Restaurant update(Restaurant updatedRestaurant);

    // Delete
    boolean delete(String id);

}
