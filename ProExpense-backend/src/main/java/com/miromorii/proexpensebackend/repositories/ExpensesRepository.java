package com.miromorii.proexpensebackend.repositories;

import com.miromorii.proexpensebackend.models.Expenses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface ExpensesRepository extends JpaRepository<Expenses, UUID> {

    List<Expenses> findExpensesByUserID(UUID userID);
}
