package com.techelevator.model;

import org.testng.Assert;
import org.testng.annotations.Test;

public class UserTest {
    @Test
    public void userModelTest() {
        User user = new User((long)0, "Mo", "pass", "auth");

        Assert.assertEquals("Mo", user.getUsername());
        Assert.assertEquals("pass", user.getPassword());
    }
}
