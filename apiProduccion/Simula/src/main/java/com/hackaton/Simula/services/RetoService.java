package com.hackaton.Simula.services;

import com.hackaton.Simula.entities.Reto;
import com.hackaton.Simula.entities.Respuesta;
import com.hackaton.Simula.entities.Usuario;
import com.hackaton.Simula.repositories.RetoRepository;
import com.hackaton.Simula.repositories.RespuestaRepository;
import com.hackaton.Simula.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RetoService {
    
    @Autowired
    private RetoRepository retoRepository;
    
    @Autowired
    private RespuestaRepository respuestaRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    public List<Reto> obtenerTodosLosRetos() {
        return retoRepository.findAll();
    }
    
    public Optional<Reto> obtenerRetoPorId(Long id) {
        return retoRepository.findById(id);
    }
    
    public Reto crearReto(Reto reto) {
        return retoRepository.save(reto);
    }
    
    public Reto actualizarReto(Long id, Reto retoActualizado) {
        return retoRepository.findById(id)
                .map(reto -> {
                    reto.setTitulo(retoActualizado.getTitulo());
                    reto.setDescripcion(retoActualizado.getDescripcion());
                    reto.setOpcion1(retoActualizado.getOpcion1());
                    reto.setOpcion2(retoActualizado.getOpcion2());
                    reto.setRespuestaCorrecta(retoActualizado.getRespuestaCorrecta());
                    reto.setRetroalimentacion(retoActualizado.getRetroalimentacion());
                    return retoRepository.save(reto);
                })
                .orElseThrow(() -> new RuntimeException("Reto no encontrado con id: " + id));
    }
    
    public void eliminarReto(Long id) {
        if (!retoRepository.existsById(id)) {
            throw new RuntimeException("Reto no encontrado con id: " + id);
        }
        retoRepository.deleteById(id);
    }
    
    public List<Reto> buscarRetosPorTitulo(String titulo) {
        return retoRepository.findByTituloContainingIgnoreCase(titulo);
    }
    
    public Respuesta responderReto(Long retoId, Long usuarioId, Integer opcionElegida) {
        Reto reto = retoRepository.findById(retoId)
                .orElseThrow(() -> new RuntimeException("Reto no encontrado con id: " + retoId));
        
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + usuarioId));
        
        // Verificar si ya respondió este reto
        Optional<Respuesta> respuestaExistente = respuestaRepository.findByUsuarioAndReto(usuario, reto);
        if (respuestaExistente.isPresent()) {
            throw new RuntimeException("El usuario ya respondió este reto");
        }
        
        // Verificar si la opción elegida es válida
        if (opcionElegida != 1 && opcionElegida != 2) {
            throw new RuntimeException("La opción elegida debe ser 1 o 2");
        }
        
        // Verificar si la respuesta es correcta
        boolean esCorrecta = reto.getRespuestaCorrecta().equals(opcionElegida);
        
        // Crear y guardar la respuesta
        Respuesta respuesta = new Respuesta();
        respuesta.setUsuario(usuario);
        respuesta.setReto(reto);
        respuesta.setOpcionElegida(opcionElegida);
        respuesta.setEsCorrecta(esCorrecta);
        
        return respuestaRepository.save(respuesta);
    }
    
    public List<Respuesta> obtenerRespuestasDeReto(Long retoId) {
        Reto reto = retoRepository.findById(retoId)
                .orElseThrow(() -> new RuntimeException("Reto no encontrado con id: " + retoId));
        
        return respuestaRepository.findByReto(reto);
    }
}
