package com.multitiered.multitiered;

import com.multitiered.multitiered.Utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/api/auth/login", "/api/auth/register", "/api/auth/refresh", "/api/auth/logout");
        web.ignoring().antMatchers(HttpMethod.OPTIONS, "/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().addFilterBefore(new JwtFilter(jwtTokenUtil), BasicAuthenticationFilter.class);
    }

    private class JwtFilter extends OncePerRequestFilter {

        private final JwtTokenUtil jwtTokenUtil;

        public JwtFilter(JwtTokenUtil jwtTokenUtil) {
            this.jwtTokenUtil = jwtTokenUtil;
        }

        @Override
        protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                        FilterChain filterChain) throws ServletException, IOException {
            try {
                String authHeader = request.getHeader("Authorization");


                if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                    throw new ServletException("Missing or invalid Authorization header.");
                }

                String jwt = authHeader.substring(7);
                if (!jwtTokenUtil.validateToken(jwt)) {
                    throw new ServletException("Invalid JWT token.");
                }

                filterChain.doFilter(request, response);
            } catch (ServletException e) {
                response.sendError(HttpServletResponse.SC_FORBIDDEN, e.getMessage());
            }
        }
    }
}
