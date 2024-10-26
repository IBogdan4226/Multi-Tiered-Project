package com.multitiered.multitiered.POJO;

public class JwtToken {
    private String token;
    private String id;
    private String alias;

    public JwtToken(String token, String id, String alias) {
        this.token = token;
        this.id = id;
        this.alias = alias;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }
}

