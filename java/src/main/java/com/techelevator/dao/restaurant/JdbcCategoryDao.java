package com.techelevator.dao.restaurant;

import com.techelevator.dao.JdbcForAll;
import com.techelevator.model.restaurant.Category;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

@Repository
public class JdbcCategoryDao extends JdbcForAll implements CategoryDao {

    public JdbcCategoryDao(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
    }

    @Override
    public long addCategory(Category newCategory) {
        String addCategorySql =
                "INSERT INTO category (alias, title) " +
                "VALUES (?, ?) " +
                "RETURNING category_id;";

        Long category_id = jdbcTemplate.queryForObject(addCategorySql, Long.class,
                newCategory.getAlias(), newCategory.getTitle());

        return category_id != null ? category_id : -1;
    }

    @Override // TODO - is it worth it?
    public Category getCategoryByTitle(String title) {
        return null;
    }

    @Override
    public Category getCategoryById(long id) {
        String sql =
                "SELECT * FROM category " +
                "WHERE category_id = ?;";
        SqlRowSet result = jdbcTemplate.queryForRowSet(sql, id);

        if(result.next()) {
            return mapRowToCategory(result);
        }

        return null;
    }

    @Override // TODO - is it worth it?
    public Category update(long id, Category updatedCategory) {
        return null;
    }

    @Override // TODO - is it worth it?
    public boolean delete(long id) {
        return false;
    }



}
