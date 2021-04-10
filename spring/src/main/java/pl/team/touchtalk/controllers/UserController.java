package pl.team.touchtalk.controllers;

import com.sun.istack.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.team.touchtalk.entities.User;
import pl.team.touchtalk.entities.UserDetails;
import pl.team.touchtalk.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/*
 * UserController
 *
 * @Author Jakub Stawowy
 * @Version 1.0
 * @Since 2021-04-06
 * */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    /*
    * constructor
    *
    * @Param userRepository for saving and getting user from database
    * */
    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /*
    * getUsers method
    *
    * @RequestMapping /api/users/
    * @RequestMethod GET
    * @Returns users List - all users from database
    * */
    @GetMapping("/")
    public List<User> getUsers(){
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }

    /*
    * getUser method
    *
    * @RequestMapping /api/users/{id}
    * @RequestMethod GET
    * @PathVariable id Long
    * @Returns user User
    * */
    @GetMapping("/{id}")
    @Nullable
    public User getUser(@PathVariable("id") Long id){
        Optional<User> optionalUser = userRepository.findById(id);

        return optionalUser.orElse(null);
    }

    /*
    * editUser method
    *
    * @RequestMapping /api/users/{id}/edit
    * @RequestMethod PUT
    * @RequestBody userDetails template
    * {
    *   "name": "<name>",
    *   "surname": "<surname>",
    *   "phone": "<phone>",
    *   "image": "<image>"
    * }
    *
    * @Returns user?null if no user found
    * */
    @PutMapping(path = "/{id}/edit", consumes = "application/json")
    @Nullable
    public User editUser(@RequestBody UserDetails details, @PathVariable("id") Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        optionalUser.ifPresent(value->{
            value.setUserDetails(details);
            userRepository.save(value);
        });
        return optionalUser.orElse(null);
    }
}