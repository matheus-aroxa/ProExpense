package com.miromorii.proexpensebackend.controllers;

import com.miromorii.proexpensebackend.models.Expenses;
import com.miromorii.proexpensebackend.services.ExpensesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.PagedModel;
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
    public PagedModel<Expenses> getExpenseByUserId(@PathVariable UUID id,
                                                   @RequestParam(value = "page", defaultValue = "0") int page,
                                                   @RequestParam(value = "itens", defaultValue = "8") int itens){
        return new PagedModel<>(expensesService.getExpenseByUserId(id, page, itens));
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
