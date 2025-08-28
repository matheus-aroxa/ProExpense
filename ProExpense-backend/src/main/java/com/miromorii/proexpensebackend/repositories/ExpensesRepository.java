package com.miromorii.proexpensebackend.repositories;

import com.miromorii.proexpensebackend.models.Expenses;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface ExpensesRepository extends JpaRepository<Expenses, UUID> {

    @Query("FROM Expenses e WHERE e.userID=:userID ORDER BY e.expenseDate DESC")
    Page<Expenses> findExpensesByUserID(UUID userID, Pageable pageable);
}
