package com.multitiered.multitiered.Controller;

import com.mongodb.DuplicateKeyException;
import com.multitiered.multitiered.Entities.User;
import com.multitiered.multitiered.Interfaces.IUserService;
import com.multitiered.multitiered.POJO.JwtToken;
import com.multitiered.multitiered.Utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    private final IUserService _userService;
    private final JwtTokenUtil _jwtUtil;

    @Autowired
    public UserController(IUserService userService, JwtTokenUtil jwtTokenUtil) {
        _userService = userService;
        _jwtUtil = jwtTokenUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User userCreated = _userService.createAccount(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(userCreated);
        } catch (DuplicateKeyException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username not available");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Error during registration");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user, HttpServletResponse response) {
        if (_userService.authenticate(user.getUsername(), user.getPassword())) {
            String userId = _userService.getUserId(user.getUsername());
            String userAlias = _userService.getUserAlias(user.getUsername());
            String token = _jwtUtil.generateToken(userId, userAlias);
            String refreshToken = _jwtUtil.generateRefreshToken(userId, userAlias);

            addRefreshTokenToResponse(response, refreshToken);

            JwtToken jwtToken = new JwtToken(token, userId, userAlias);
            return ResponseEntity.ok(jwtToken);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed");
        }
    }

    @GetMapping("/refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest request) {
        String refreshToken = extractRefreshTokenFromRequest(request);
        if (refreshToken == null || !_jwtUtil.validateToken(refreshToken)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        String username = _jwtUtil.getUsernameFromToken(refreshToken);
        String userId = _jwtUtil.getUserIdFromToken(refreshToken);

        if (username != null && userId != null) {
            String newToken = _jwtUtil.generateToken(userId, username);
            JwtToken jwtToken = new JwtToken(newToken, userId, username);
            return ResponseEntity.ok(jwtToken);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        clearRefreshToken(response);
        return ResponseEntity.ok().build();
    }

    private void addRefreshTokenToResponse(HttpServletResponse response, String refreshToken) {
        Cookie refreshTokenCookie = new Cookie("refresh_token", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setMaxAge(60 * 60 * 24); // 1 day
        refreshTokenCookie.setPath("/");
        response.addCookie(refreshTokenCookie);
    }

    private String extractRefreshTokenFromRequest(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) return null;

        for (Cookie cookie : cookies) {
            if ("refresh_token".equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }

    private void clearRefreshToken(HttpServletResponse response) {
        Cookie refreshTokenCookie = new Cookie("refresh_token", null);
        refreshTokenCookie.setMaxAge(0);
        refreshTokenCookie.setPath("/");
        response.addCookie(refreshTokenCookie);
    }
}
