package com.lige110.springreact.ppmtool.web;


import com.lige110.springreact.ppmtool.domain.User;
import com.lige110.springreact.ppmtool.services.MapValidationErrorService;
import com.lige110.springreact.ppmtool.services.UserService;
import com.lige110.springreact.ppmtool.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;

    private MapValidationErrorService mapValidationErrorService;

    private UserValidator userValidator;

    public UserController(@Autowired UserService userService,
                          @Autowired MapValidationErrorService mapValidationErrorService,
                          @Autowired UserValidator userValidator) {
        this.userService = userService;
        this.mapValidationErrorService = mapValidationErrorService;
        this.userValidator = userValidator;
    }

    @PostMapping("/register")
    public ResponseEntity<?> RegisterUser(@Valid @RequestBody User user, BindingResult result){
        // Validate the passwords match
        userValidator.validate(user, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        User newUser = userService.saveUser(user);

        return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }
}
