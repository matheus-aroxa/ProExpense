package com.miromorii.proexpensebackend.controllers;

import com.miromorii.proexpensebackend.models.Categories;
import com.miromorii.proexpensebackend.services.CategoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/categories")
public class CategoriesController {

    @Autowired 
    private CategoriesService categoriesService;

    @GetMapping
    public List<Categories> getAllCategories() {
        return categoriesService.findAllCategories();
    }

    @GetMapping("/{id}")
    public Categories getCategories(@PathVariable UUID id) {
        return categoriesService.getCategoryById(id);
    }

    @GetMapping("/userId/{id}")
    public List<Categories> getCategoriesByUserId(@PathVariable UUID id) {
        return categoriesService.getCategoryByUserId(id);
    }

    @PostMapping
    public Categories createCategories(@RequestBody Categories categories) {
        return categoriesService.createCategory(categories);
    }
    
    @PutMapping
    public Categories updateCategory(@RequestBody Categories category) {
        return categoriesService.updateCategory(category);
    }
    
    @DeleteMapping("/{id}")
    public void deleteCategories(@PathVariable UUID id) {
        categoriesService.deleteCategory(id);
    }
}
