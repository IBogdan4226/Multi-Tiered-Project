package com.multitiered.multitiered.Services;

import com.multitiered.multitiered.Entities.User;
import com.multitiered.multitiered.Interfaces.IUserService;
import com.multitiered.multitiered.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements IUserService {
    private final UserRepository _userRepo;
    private final PasswordEncoder _passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepo, PasswordEncoder passwordEncoder) {
        _userRepo = userRepo;
        _passwordEncoder = passwordEncoder;
    }

    @Override
    public List<User> getAll() {
        return _userRepo.findAll();
    }

    @Override
    public User createAccount(User user) {
        user.setPassword(_passwordEncoder.encode(user.getPassword()));
        return _userRepo.save(user);
    }

    @Override
    public boolean authenticate(String username, String password) {
        User user = _userRepo.findByUsername(username);
        if (user == null) {
            return false;
        }

        return _passwordEncoder.matches(password, user.getPassword());
    }

    @Override
    public String getUserId(String username) {
        User user = _userRepo.findByUsername(username);
        return user.getId();
    }

    @Override
    public String getUserAlias(String username) {
        User user = _userRepo.findByUsername(username);
        return user.getAlias();
    }
}
