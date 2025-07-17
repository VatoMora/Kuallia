package com.hackaton.Simula.repositories;

import com.hackaton.Simula.entities.Respuesta;
import com.hackaton.Simula.entities.Usuario;
import com.hackaton.Simula.entities.Reto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface RespuestaRepository extends JpaRepository<Respuesta, Long> {
    
    List<Respuesta> findByUsuario(Usuario usuario);
    
    List<Respuesta> findByReto(Reto reto);
    
    Optional<Respuesta> findByUsuarioAndReto(Usuario usuario, Reto reto);
    
    List<Respuesta> findByUsuarioAndEsCorrecta(Usuario usuario, Boolean esCorrecta);
}
