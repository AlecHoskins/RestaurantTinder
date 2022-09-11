package com.techelevator.dao.event;

import com.techelevator.model.restaurant.Restaurant;

import java.util.List;

public interface EventRestaurantDao {

    // Create
    boolean addEventRestaurant(long eventId, String restaurantId);

    // Read
    List<Restaurant> getEventRestaurants(long eventId);

    // Update n/a

    // Delete
    boolean delete(long eventId, String restaurantId);

}
