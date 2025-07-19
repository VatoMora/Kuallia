package com.hackaton.Simula.repositories;

import com.hackaton.Simula.entities.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    
    // Buscar productos por negocio
    List<Producto> findByNegocioId(Long negocioId);
    
    // Buscar productos por nombre
    List<Producto> findByNombreContainingIgnoreCase(String nombre);
    
    // Buscar productos por marca
    List<Producto> findByMarcaContainingIgnoreCase(String marca);
    
    // Buscar productos por negocio y nombre
    List<Producto> findByNegocioIdAndNombreContainingIgnoreCase(Long negocioId, String nombre);
}
