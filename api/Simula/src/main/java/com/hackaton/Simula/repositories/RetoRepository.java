package com.hackaton.Simula.repositories;

import com.hackaton.Simula.entities.Reto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RetoRepository extends JpaRepository<Reto, Long> {
    
    List<Reto> findByTituloContainingIgnoreCase(String titulo);
}
