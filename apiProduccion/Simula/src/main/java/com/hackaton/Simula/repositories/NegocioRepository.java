package com.hackaton.Simula.repositories;

import com.hackaton.Simula.entities.Negocio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NegocioRepository extends JpaRepository<Negocio, Long> {
    
    // Buscar negocios por usuario
    List<Negocio> findByUsuarioId(Long usuarioId);
    
    // Buscar negocios por usuario ordenados por fecha de creación (más recientes primero)
    List<Negocio> findByUsuarioIdOrderByFechaCreacionDesc(Long usuarioId);
    
    // Buscar negocios por giro
    List<Negocio> findByGiroContainingIgnoreCase(String giro);
    
    // Buscar negocios por nombre
    List<Negocio> findByNombreContainingIgnoreCase(String nombre);
    
    // Verificar si ya existe un negocio con el mismo nombre para el usuario
    boolean existsByNombreAndUsuarioId(String nombre, Long usuarioId);
    
    // Consulta personalizada para obtener negocios con productos
    @Query("SELECT n FROM Negocio n LEFT JOIN FETCH n.productos WHERE n.usuario.id = :usuarioId")
    List<Negocio> findByUsuarioIdWithProductos(@Param("usuarioId") Long usuarioId);
}
