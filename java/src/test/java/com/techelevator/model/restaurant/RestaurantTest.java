package com.techelevator.model.restaurant;

import org.testng.Assert;
import org.testng.annotations.Test;

import java.util.ArrayList;
import java.util.List;

public class RestaurantTest {

    @Test
    public void restaurantModelTest() {

        List<Category> categoryList = new ArrayList<>();
        Category category = new Category();
        categoryList.add(category);

        Location location = new Location();

        List<Hours> hoursList = new ArrayList<>();
        Hours hours = new Hours();
        hoursList.add(hours);

        Restaurant restaurant = new Restaurant("test1", "test2", "test3", true,
                categoryList, location, "phoneTest", "displayPhoneTest", hoursList);

        Assert.assertEquals("test1", restaurant.getId());
        Assert.assertEquals("test2", restaurant.getName());
        Assert.assertEquals("test3", restaurant.getImageUrl());
        Assert.assertTrue(restaurant.isClosed());
        Assert.assertEquals(categoryList, restaurant.getCategories());
        Assert.assertEquals(location, restaurant.getLocation());
        Assert.assertEquals("phoneTest", restaurant.getPhone());
        Assert.assertEquals("displayPhoneTest", restaurant.getDisplayPhone());
        Assert.assertEquals(hoursList, restaurant.getHours());
    }
}
