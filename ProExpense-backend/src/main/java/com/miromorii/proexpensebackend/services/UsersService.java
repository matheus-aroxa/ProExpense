package com.miromorii.proexpensebackend.services;

import com.miromorii.proexpensebackend.models.Users;
import com.miromorii.proexpensebackend.repositories.UsersRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class UsersService {

    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    private final Logger logger = LoggerFactory.getLogger(UsersService.class);

    //------------------------------------------------------------------------------------------------------------------
    public List<Users> findAllUsers() {
        logger.info("Finding all users");
        return usersRepository.findAll();
    }

    public Users getUserById(UUID id){
        logger.info("Finding user by id: {}", id);

        if(id == null){
            logger.error("Cannot find user by id because user id is null");
            throw new IllegalArgumentException("Id cannot be null");
        }
        return usersRepository.findById(id).orElse(null);
    }

    public Users createUser(Users user){
        logger.info("Creating a user");

        if(user == null){
            logger.error("Cannot create a user because user is null");
            throw new IllegalArgumentException("User cannot be null");
        }

        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        return usersRepository.save(user);
    }

    public Users updateUser(Users user){
        logger.info("Updating user");
        Users foundUser;

        if(user == null){
            logger.error("Cannot update a user because user is null");
            throw new IllegalArgumentException("User cannot be null");
        }

        foundUser = usersRepository.findById(user.getId()).orElse(null);

        if(foundUser == null){
            logger.error("Cannot update a user because user does not exist");
            throw new IllegalArgumentException("User does not exist");
        }

        foundUser.setName(user.getName());
        foundUser.setEmail(user.getEmail());
        foundUser.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        return usersRepository.save(foundUser);
    }

    public void deleteUser(UUID id){
        logger.info("Deleting user");

        if(usersRepository.existsById(id)){
            usersRepository.deleteById(id);
        } else {
            logger.error("Cannot delete a user because user does not exist");
            throw new IllegalArgumentException("User does not exist");
        }
    }

    public Users getUserByEmail(String email) {
        logger.info("Finding user by email: {}", email);

        if(email == null){
            logger.error("Cannot find user by email because user email is null");
            throw new IllegalArgumentException("Email cannot be null");
        }
        return usersRepository.findByEmail(email).orElse(null);
    }
}
