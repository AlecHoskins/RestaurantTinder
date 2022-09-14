package com.techelevator.dao.restaurant;

import com.techelevator.dao.JdbcForAll;
import com.techelevator.model.restaurant.Location;
import com.techelevator.model.restaurant.Restaurant;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

@Repository
public class JdbcRestaurantDao extends JdbcForAll implements RestaurantDao{

    public JdbcRestaurantDao(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
    }

    @Override
    public Restaurant findRestaurantById(String restaurantId) {
        String sql = "SELECT * FROM restaurant WHERE restaurant_id = ?;";
        SqlRowSet result = jdbcTemplate.queryForRowSet(sql, restaurantId);

        if(result.next()) {
            return mapRowToRestaurant(result);
        }

        return null;
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
                "WHERE restaurant_id = ?;";

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
}