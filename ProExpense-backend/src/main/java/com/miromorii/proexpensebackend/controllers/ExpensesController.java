package com.miromorii.proexpensebackend.controllers;

import com.miromorii.proexpensebackend.models.Expenses;
import com.miromorii.proexpensebackend.services.ExpensesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/expenses")
public class ExpensesController {

    @Autowired
    private ExpensesService expensesService;

    //---------------------------------------------------------------------------------
    @GetMapping()
    public List<Expenses> getAllExpenses(){
        return expensesService.findAllExpenses();
    }

    @GetMapping("/{id}")
    public Expenses getExpenseById(@PathVariable UUID id){
        return expensesService.getExpenseById(id);
    }

    @GetMapping("/userId/{id}")
    public List<Expenses> getExpenseByUserId(@PathVariable UUID id){
        return expensesService.getExpenseByUserId(id);
    }

    @PostMapping
    public Expenses createExpense(@RequestBody Expenses expense){
        return expensesService.createExpense(expense);
    }

    @PutMapping
    public Expenses updateExpense(@RequestBody Expenses expense){
        return expensesService.updateExpense(expense);
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable UUID id){
        expensesService.deleteExpense(id);
    }
}
