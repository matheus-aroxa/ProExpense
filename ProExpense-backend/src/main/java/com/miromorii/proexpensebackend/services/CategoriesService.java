package com.miromorii.proexpensebackend.services;

import com.miromorii.proexpensebackend.models.Categories;
import com.miromorii.proexpensebackend.repositories.CategoriesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class CategoriesService {

    @Autowired
    private CategoriesRepository categoriesRepository;

    private final Logger logger = LoggerFactory.getLogger(CategoriesService.class);

    //------------------------------------------------------------------------------------------------------------------
    public List<Categories> findAllCategories() {
        logger.info("Finding all categories");
        return categoriesRepository.findAll();
    }

    public Categories getCategoryById(UUID id){
        logger.info("Finding category by id: {}", id);

        if(id == null){
            logger.error("Cannot find category by id because category id is null");
            throw new IllegalArgumentException("Id cannot be null");
        }
        return categoriesRepository.findById(id).orElse(null);
    }

    public Categories createCategory(Categories category){
        logger.info("Creating a category");

        if(category == null){
            logger.error("Cannot create a category because category is null");
            throw new IllegalArgumentException("category cannot be null");
        }

        return categoriesRepository.save(category);
    }

    public Categories updateCategory(Categories category){
        logger.info("Updating category");
        Categories foundCategory;

        if(category == null){
            logger.error("Cannot update a category because category is null");
            throw new IllegalArgumentException("category cannot be null");
        }

        foundCategory = categoriesRepository.findById(category.getId()).orElse(null);

        if(foundCategory == null){
            logger.error("Cannot update a category because category does not exist");
            throw new IllegalArgumentException("category does not exist");
        }

        foundCategory.setName(category.getName());
        return categoriesRepository.save(foundCategory);
    }

    public void deleteCategory(UUID id){
        logger.info("Deleting category");

        if(categoriesRepository.existsById(id)){
            categoriesRepository.deleteById(id);
        } else {
            logger.error("Cannot delete a category because category does not exist");
            throw new IllegalArgumentException("category does not exist");
        }
    }

    public List<Categories> getCategoryByUserId(UUID id) {
        logger.info("Finding category by user id: {}", id);

        if(id == null){
            logger.error("Cannot find category by id because user id is null");
            throw new IllegalArgumentException("Id cannot be null");
        }
        return categoriesRepository.findByUserID(id);
    }
}
