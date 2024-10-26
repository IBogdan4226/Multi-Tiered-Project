package com.multitiered.multitiered.Utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.Calendar;
import java.util.Date;

@Service
public class JwtTokenUtil {
    private static final String CLAIM_KEY_USERNAME = "sub";
    private static final String CLAIM_KEY_CREATED = "iat";
    private static final int expirationInMinutes = 60;
    @Value("${jwt.secret}")
    private String secret;

    public String getUserIdFromToken(String token) {
        String username;
        try {
            Claims claims = getClaimsFromToken(token);
            username = claims.getSubject();
        } catch (Exception e) {
            username = null;
        }
        return username;
    }

    public String getUsernameFromToken(String token) {
        String username;
        try {
            Claims claims = getClaimsFromToken(token);
            username = (String) claims.get("user");
        } catch (Exception e) {
            username = null;
        }
        return username;
    }

    private Claims getClaimsFromToken(String token) {
        Claims claims;
        try {
            claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
        } catch (Exception e) {
            claims = null;
        }
        return claims;
    }

    public boolean isExpired(String token) {
        Date expiration;
        try {
            Claims claims = getClaimsFromToken(token);
            expiration = claims.getExpiration();
        } catch (Exception e) {
            expiration = null;
        }
        return expiration.before(new Date());
    }

    public String generateToken(String userId, String username) {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MINUTE, expirationInMinutes);

        return Jwts.builder()
                .setSubject(userId)
                .claim("user", username)
                .setExpiration(cal.getTime())
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    public String generateRefreshToken(String userId, String username) {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.HOUR, 24);

        return Jwts.builder()
                .setSubject(userId)
                .claim("user", username)
                .claim("refresh", true)
                .setExpiration(cal.getTime())
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return !isExpired(token);
        } catch (SignatureException ex) {
            return false;
        }
    }

}