package com.techelevator.dao.event;

import com.techelevator.dao.JdbcForAll;
import com.techelevator.model.restaurant.Restaurant;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;

import java.util.ArrayList;
import java.util.List;

public class JdbcEventRestaurantDao extends JdbcForAll implements EventRestaurantDao {

    public JdbcEventRestaurantDao(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
    }

    @Override
    public boolean addEventRestaurant(long eventId, String restaurantId) {
        String sql =
                "INSERT INTO event_restaurant (restaurant_id, event_id)" +
                "Values (?, ?";

        jdbcTemplate.queryForObject(sql, Long.class, eventId, restaurantId);
        return false;
    }

    @Override
    public List<Restaurant> getEventRestaurants(long eventId) {
        String sql =
                "Select restaurant_id, image_url, restaurant_name, address, city, state, zip, phone, display_phone FROM restaurant " +
                "JOIN event_restaurant ON restaurant.restaurant_id = event_restaurant.restaurant_id" +
                "WHERE event_id = ?;";

        SqlRowSet result = jdbcTemplate.queryForRowSet(sql, eventId);

        List<Restaurant> restaurants = new ArrayList<>();

        while(result.next()) {
            restaurants.add(mapRowToRestaurant(result));
        }
        return restaurants;
    }

    @Override
    public boolean delete(long eventId, String restaurantId) {
        return false;
    }
}
