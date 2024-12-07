package com.multitiered.multitiered.Services;

import com.multitiered.multitiered.Entities.User;
import com.multitiered.multitiered.Exceptions.GenericException;
import com.multitiered.multitiered.Repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new User("1", "john_doe", "password123", "JohnD");
    }

    @Test
    void testCreateAccount_ValidUser_SavesSuccessfully() throws GenericException {
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword123");
        when(userRepository.save(user)).thenReturn(user);

        User result = userService.createAccount(user);

        assertNotNull(result);
        assertEquals("john_doe", result.getUsername());
        assertEquals("encodedPassword123", result.getPassword());
        assertEquals("JohnD", result.getAlias());

        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testCreateAccount_InvalidUsername_ThrowsGenericException() {
        user.setUsername("ab");
        assertThrows(GenericException.class, () -> userService.createAccount(user));
    }

    @Test
    void testCreateAccount_InvalidPassword_ThrowsGenericException() {
        user.setPassword("123");
        assertThrows(GenericException.class, () -> userService.createAccount(user));
    }

    @Test
    void testCreateAccount_InvalidAlias_ThrowsGenericException() {
        user.setAlias("A");
        assertThrows(GenericException.class, () -> userService.createAccount(user));
    }

    @Test
    void testAuthenticate_InvalidPassword_ReturnsFalse() {
        when(userRepository.findByUsername("john_doe")).thenReturn(user);
        when(passwordEncoder.matches("wrongpassword", "encodedPassword123")).thenReturn(false);

        boolean result = userService.authenticate("john_doe", "wrongpassword");

        assertFalse(result);
    }

    @Test
    void testAuthenticate_UserNotFound_ReturnsFalse() {
        when(userRepository.findByUsername("non_existent_user")).thenReturn(null);

        boolean result = userService.authenticate("non_existent_user", "password123");

        assertFalse(result);
    }

    @Test
    void testGetUserId_ValidUsername_ReturnsUserId() {
        when(userRepository.findByUsername("john_doe")).thenReturn(user);

        String userId = userService.getUserId("john_doe");

        assertEquals("1", userId);
    }

    @Test
    void testGetUserAlias_ValidUsername_ReturnsUserAlias() {
        when(userRepository.findByUsername("john_doe")).thenReturn(user);

        String alias = userService.getUserAlias("john_doe");

        assertEquals("JohnD", alias);
    }
}