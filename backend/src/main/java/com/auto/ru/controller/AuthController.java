package com.auto.ru.controller;

import com.auto.ru.controller.request.AuthRequest;
import com.auto.ru.controller.response.AuthResponse;
import com.auto.ru.entity.User;
import com.auto.ru.service.UserService;
import com.auto.ru.service.jwt.JwtTokenService;
import com.auto.ru.service.jwt.JwtUserDetails;
import com.auto.ru.service.jwt.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUserDetailsService jwtUserDetailsService;
    private final JwtTokenService jwtTokenService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager,
                          JwtUserDetailsService jwtUserDetailsService,
                          JwtTokenService jwtTokenService,
                          UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtUserDetailsService = jwtUserDetailsService;
        this.jwtTokenService = jwtTokenService;
        this.userService = userService;
    }

    @PostMapping("/registration")
    public ResponseEntity<String> registration(@RequestBody User user) {
        if (userService.saveUser(user))
            return new ResponseEntity<>("User created", HttpStatus.OK);
        return new ResponseEntity<>("User with the same name already exists", HttpStatus.FOUND);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authenticationRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authenticationRequest.username(),
                            authenticationRequest.password()
                    )
            );
        } catch (BadCredentialsException credentialsException) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        JwtUserDetails userDetails = (JwtUserDetails) jwtUserDetailsService.loadUserByUsername(authenticationRequest.username());
        String token = jwtTokenService.generateToken(userDetails);
        AuthResponse response = new AuthResponse(token);

        return ResponseEntity.ok(response);
    }

}
