package com.miromorii.proexpensebackend.controllers;

import com.miromorii.proexpensebackend.models.Users;
import com.miromorii.proexpensebackend.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UsersController {

    @Autowired
    private UsersService usersService;

    @GetMapping()
    public List<Users> getAllUsers(){
        return usersService.findAllUsers();
    }

    @GetMapping("/{id}")
    public Users getUserById(@PathVariable UUID id){
        return usersService.getUserById(id);
    }

    @GetMapping("/email/{email}")
    public Users getUserByEmail(@PathVariable String email){
        return usersService.getUserByEmail(email);
    }

    @PostMapping
    public Users createUser(@RequestBody Users user){
        return usersService.createUser(user);
    }

    @PutMapping
    public Users updateUser(@RequestBody Users user){
        return usersService.updateUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable UUID id){
        usersService.deleteUser(id);
    }
}
