package com.hackaton.Simula.repositories;

import com.hackaton.Simula.entities.Capsula;
import com.hackaton.Simula.enums.TipoCapsula;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CapsulaRepository extends JpaRepository<Capsula, Long> {
    
    List<Capsula> findByTipo(TipoCapsula tipo);
    
    List<Capsula> findByTituloContainingIgnoreCase(String titulo);
}
