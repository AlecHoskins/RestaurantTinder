package com.techelevator.dao.restaurant;

import com.techelevator.model.restaurant.Day;

import java.util.List;

public interface RestaurantHoursDao {

    // Create
    List<Long> addAllHours(List<Day> days);
    long addDay(Day day);

    // Read
    List<Day> getHoursByRestaurant(String restaurantId);

    // Update n/a

    // Delete
    boolean delete(long id);

}
