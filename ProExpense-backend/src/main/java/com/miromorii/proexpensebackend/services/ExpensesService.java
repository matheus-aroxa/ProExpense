package com.miromorii.proexpensebackend.services;

import com.miromorii.proexpensebackend.models.Expenses;
import com.miromorii.proexpensebackend.models.Expenses;
import com.miromorii.proexpensebackend.repositories.ExpensesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class ExpensesService {

    @Autowired
    private ExpensesRepository expensesRepository;
    
    private final Logger logger = LoggerFactory.getLogger(ExpensesService.class);

    //-----------------------------------------------------------------------------------------------------
    public List<Expenses> findAllExpenses() {
        logger.info("Finding all expenses");
        return expensesRepository.findAll();
    }

    public Expenses getExpenseById(UUID id){
        logger.info("Finding expense by id: {}", id);

        if(id == null){
            logger.error("Cannot find expense by id because expense id is null");
            throw new IllegalArgumentException("Id cannot be null");
        }
        return expensesRepository.findById(id).orElse(null);
    }

    public Expenses createExpense(Expenses expenses){
        logger.info("Creating a expense");

        if(expenses == null){
            logger.error("Cannot create a expense because expense is null");
            throw new IllegalArgumentException("Expense cannot be null");
        }

        return expensesRepository.save(expenses);
    }

    public Expenses updateExpense(Expenses expense){
        logger.info("Updating expense");
        Expenses foundExpense;

        if(expense == null){
            logger.error("Cannot update a expense because expense is null");
            throw new IllegalArgumentException("Expense cannot be null");
        }

        foundExpense = expensesRepository.findById(expense.getId()).orElse(null);

        if(foundExpense == null){
            logger.error("Cannot update a expense because expense does not exist");
            throw new IllegalArgumentException("Expense does not exist");
        }

        foundExpense.setName(expense.getName());
        foundExpense.setDescription(expense.getDescription());
        foundExpense.setExpenseDate(expense.getExpenseDate());
        foundExpense.setReceiptUrl(expense.getReceiptUrl());
        foundExpense.setAmount(expense.getAmount());
        return expensesRepository.save(foundExpense);
    }

    public void deleteExpense(UUID id){
        logger.info("Deleting expense");

        if(expensesRepository.existsById(id)){
            expensesRepository.deleteById(id);
        } else {
            logger.error("Cannot delete a expense because expense does not exist");
            throw new IllegalArgumentException("Expense does not exist");
        }
    }

    public Page<Expenses> getExpenseByUserId(UUID id, int page, int itens) {
        logger.info("Finding expense page {} with {} itens from user: {}", page, itens, id);

        if(id == null){
            logger.error("Cannot find expense by id because user id is null");
            throw new IllegalArgumentException("Id cannot be null");
        }
        return expensesRepository.findExpensesByUserID(id, PageRequest.of(page, itens));
    }

}
