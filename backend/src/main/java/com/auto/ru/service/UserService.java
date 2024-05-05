package com.auto.ru.service;

import com.auto.ru.controller.request.UpdateUserRequest;
import com.auto.ru.entity.Role;
import com.auto.ru.entity.User;
import com.auto.ru.exception.BadRequestException;
import com.auto.ru.exception.UserNotFoundException;
import com.auto.ru.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.security.Principal;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Validated
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public User findByUsernameOrThrow(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User with username " + username + " not found"));
    }

    public boolean saveUser(User user) {
        Optional<User> userFromDataBase = userRepository.findByUsername(user.getUsername());

        if (userFromDataBase.isPresent()) {
            return false;
        }

        user.setRole(Role.ROLE_ADMIN);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        return true;
    }

    public void validateAndUpdateUser(Principal principal, @Valid UpdateUserRequest updatedUser) {
        User currentUser = findByUsernameOrThrow(principal.getName());

        validateUsername(updatedUser.getUsername());
        validatePassword(updatedUser.getPassword());

        currentUser.setUsername(updatedUser.getUsername());
        currentUser.setPassword(updatedUser.getPassword());

        userRepository.save(currentUser);
    }

    private void validateUsername(String username) {
        if (username == null || username.isEmpty()) {
            throw new BadRequestException("Username cannot be empty");
        }

        Pattern pattern = Pattern.compile("[^a-zA-Z0-9@_-]");
        Matcher matcher = pattern.matcher(username);

        if (matcher.find()) {
            throw new BadRequestException("Username contains invalid characters");
        }
    }

    private void validatePassword(String password) {
        if (password == null || password.isEmpty()) {
            throw new BadRequestException("Password cannot be empty");
        }

        Pattern upperCase = Pattern.compile("[A-Z]");
        Pattern lowerCase = Pattern.compile("[a-z]");
        Pattern characters = Pattern.compile("[!@#$%^&*()+=;_-]");

        Matcher upperCaseMatcher = upperCase.matcher(password);
        Matcher lowerCaseMatcher = lowerCase.matcher(password);
        Matcher charactersMatcher = characters.matcher(password);

        if (!upperCaseMatcher.find()) {
            throw new BadRequestException("Password must contain uppercase characters");
        }

        if (!lowerCaseMatcher.find()) {
            throw new BadRequestException("Password must contain lowercase characters");
        }

        if (!charactersMatcher.find()) {
            throw new BadRequestException("Password must contain at least one of the characters: [!@#$%^&*()_-+=;]");
        }
    }
}
