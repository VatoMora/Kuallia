package com.hackaton.Simula.repositories;

import com.hackaton.Simula.entities.Usuario;
import com.hackaton.Simula.enums.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    Optional<Usuario> findByEmail(String email);
    
    List<Usuario> findByRol(Rol rol);
    
    List<Usuario> findByNivel(Integer nivel);
    
    boolean existsByEmail(String email);
}
