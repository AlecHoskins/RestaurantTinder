/**
 * This enum class contains a hierarchical list of all the urls used in the API
 */
package com.techelevator.util;

public enum Url {
    BASE("http://localhost:8081/"),
    LOGIN("login/"),
    REGISTER("register/"),
    USERNAME("username/");

    private final String path;

    Url(String path) {
        this.path = path;
    }

    @Override
    public String toString() {
        return this.path;
    }
}
