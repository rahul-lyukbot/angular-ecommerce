package com.lyukbot.ecommerce.dao;

import com.lyukbot.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")  // here we give our angular app origin so it can accept call from web browser scripts for this origin
public interface ProductRepository extends JpaRepository<Product, Long> {
    // adding a query method, so we can get the category by ID using this method
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);

    Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);
}
