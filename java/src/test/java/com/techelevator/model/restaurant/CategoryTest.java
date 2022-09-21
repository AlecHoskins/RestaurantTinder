package com.techelevator.model.restaurant;

import org.testng.Assert;
import org.testng.annotations.Test;

public class CategoryTest {
    @Test
    public void categoryModelTest() {
        Category category = new Category("alias", "title", 0);

        Assert.assertEquals("alias", category.getAlias());
        Assert.assertEquals("title", category.getTitle());
        Assert.assertEquals(0, category.getId());
    }
}
