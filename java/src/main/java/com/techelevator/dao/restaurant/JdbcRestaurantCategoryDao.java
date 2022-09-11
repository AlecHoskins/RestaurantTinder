package com.techelevator.dao.restaurant;

import com.techelevator.dao.JdbcForAll;
import com.techelevator.model.restaurant.Category;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class JdbcRestaurantCategoryDao extends JdbcForAll implements RestaurantCategoryDao {

    public JdbcRestaurantCategoryDao(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
    }

    @Override
    public boolean addRestaurantCategory(String restaurantId, long categoryId) {
        String sql =
                "INSERT INTO restaurant (restaurant_id, category_id) " +
                "VALUES (?, ?) " +
                "RETURNING category_id;";
        Long dataCategoryId = jdbcTemplate.queryForObject(sql, Long.class, restaurantId, categoryId);

        return dataCategoryId != null && dataCategoryId == categoryId;
    }

    @Override
    public List<Category> getCategoriesByRestaurant(String restaurantId) {
        String sql =
                "SELECT * FROM category " +
                "JOIN restaurant_category USING(category_id) " +
                "WHERE restaurant_id = ?;";

        SqlRowSet result = jdbcTemplate.queryForRowSet(sql, restaurantId);

        List<Category> categories = new ArrayList<>();

        while(result.next()) {
            categories.add(mapRowToCategory(result));
        }

        return categories;
    }

    @Override
    public boolean delete(String restaurantId, long categoryId) {
        String deleteSql =
                "DELETE FROM restaurant_category " +
                "WHERE restaurant_id = ? AND category_id = ?;";
        int numberOfRowsDeleted = jdbcTemplate.update(deleteSql, restaurantId, categoryId);

        return numberOfRowsDeleted == 1;
    }

}
