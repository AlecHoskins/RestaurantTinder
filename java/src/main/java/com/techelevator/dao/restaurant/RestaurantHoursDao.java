package com.techelevator.dao.restaurant;

import com.techelevator.model.restaurant.Day;
import com.techelevator.model.restaurant.Hours;

import java.util.List;

public interface RestaurantHoursDao {

    // Create
    List<Long> addAllHours(List<Hours> hours, String restaurantId);

    long addDay(Day day, String id);

    // Read
    List<Day> getHoursByRestaurant(String restaurantId);

    // Update n/a

    // Delete
    boolean delete(long id);

}
