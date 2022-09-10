package com.techelevator.model;

public class Guest {

    private long id;
    private String nickname;
    private String inviteUrl;
    private String role;
    private long userId;

    public Guest(long id, String nickname, String inviteUrl, String role, long userId) {
        this.id = id;
        this.nickname = nickname;
        this.inviteUrl = inviteUrl;
        this.role = role;
        this.userId = userId;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getInviteUrl() {
        return inviteUrl;
    }

    public void setInviteUrl(String inviteUrl) {
        this.inviteUrl = inviteUrl;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }
}
