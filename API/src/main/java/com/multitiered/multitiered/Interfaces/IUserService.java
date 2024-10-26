package com.multitiered.multitiered.Interfaces;

import com.multitiered.multitiered.Entities.User;
import java.util.List;

public interface IUserService {
    List<User> getAll();

    User createAccount(User user);

    boolean authenticate(String username, String password);

    String getUserId(String username);

    String getUserAlias(String username);
}