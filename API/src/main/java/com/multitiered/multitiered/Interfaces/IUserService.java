package com.multitiered.multitiered.Interfaces;

import com.multitiered.multitiered.Entities.User;
import com.multitiered.multitiered.Exceptions.GenericException;

import java.util.List;

public interface IUserService {
    List<User> getAll();

    User createAccount(User user) throws GenericException;

    boolean authenticate(String username, String password);

    String getUserId(String username);

    String getUserAlias(String username);
}