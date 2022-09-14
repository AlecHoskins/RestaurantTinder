package com.techelevator.dao.restaurant;

import com.techelevator.model.restaurant.Category;

public interface CategoryDao {

    // Create
    long addCategory(Category newCategory);

    // Read
    Category getCategoryByTitle(String title);
    Category getCategoryById(long id);
    long getCategoryId(String alias, String title);

    // Update
    Category update(long id, Category updatedCategory);

    // Delete
    boolean delete(long id);

}
