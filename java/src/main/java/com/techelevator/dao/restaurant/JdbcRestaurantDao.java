package com.techelevator.dao.restaurant;

import com.techelevator.model.restaurant.Location;
import com.techelevator.model.restaurant.Restaurant;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Component
public class JdbcRestaurantDao implements RestaurantDao{

    private final JdbcTemplate jdbcTemplate;

    public JdbcRestaurantDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Restaurant findRestaurantById(String restaurantId) {
        String sql = "SELECT * FROM restaurant WHERE restaurant_id = ?;";
        SqlRowSet result = jdbcTemplate.queryForRowSet(sql, restaurantId);

        if(result.next()) {
            return mapRowToRestaurant(result);
        } else {
            return null;
        }
    }

    @Override
    public Restaurant update(Restaurant updatedRestaurant) {

        // TODO - is any of this worth it?

        return null;
    }

    @Override
    public boolean delete(String id) {

        // TODO - is delete worth it?

        String deleteRestaurantSql =
                "DELETE FROM restaurant" +
                "WHERE restarant_id = ?;";

        return false;
    }

    @Override
    public boolean save(Restaurant newRestaurant) {
        String addRestaurantSql =
                "INSERT INTO restaurant (restaurant_id, image_url, restaurant_name, address, city, state, zip, phone, display_phone) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) " +
                "RETURNING restaurant_id;";
        Location newLocation = newRestaurant.getLocation();
        String restaurantId = jdbcTemplate.queryForObject(addRestaurantSql, String.class,
                newRestaurant.getId(), newRestaurant.getImageUrl(), newRestaurant.getName(),
                newLocation.getAddress1(), newLocation.getCity(), newLocation.getState(), newLocation.getZipCode(),
                newRestaurant.getPhone(), newRestaurant.getDisplayPhone());

        return restaurantId != null && restaurantId.equals(newRestaurant.getId());
    }

    private Restaurant mapRowToRestaurant(SqlRowSet rs) {
        Restaurant restaurant = new Restaurant();

        restaurant.setId(rs.getString("restaurant_id"));
        restaurant.setName(rs.getString("restaurant_name"));
        restaurant.setImageUrl(rs.getString("image_url"));
        restaurant.setPhone(rs.getString("phone"));
        restaurant.setDisplayPhone(rs.getString("display_phone"));

        Location location = new Location();
        location.setAddress1(rs.getString("address"));
        location.setCity(rs.getString("city"));
        location.setState(rs.getString("state"));
        location.setZipCode(rs.getString("zip"));

        restaurant.setLocation(location);

        return restaurant;
    }
}