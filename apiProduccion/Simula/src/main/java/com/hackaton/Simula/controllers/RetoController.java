package com.hackaton.Simula.controllers;

import com.hackaton.Simula.entities.Reto;
import com.hackaton.Simula.entities.Respuesta;
import com.hackaton.Simula.services.RetoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/retos")
@CrossOrigin(origins = "*")
public class RetoController {
    
    @Autowired
    private RetoService retoService;
    
    @GetMapping
    public ResponseEntity<List<Reto>> obtenerTodosLosRetos() {
        List<Reto> retos = retoService.obtenerTodosLosRetos();
        return ResponseEntity.ok(retos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Reto> obtenerRetoPorId(@PathVariable Long id) {
        return retoService.obtenerRetoPorId(id)
                .map(reto -> ResponseEntity.ok(reto))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<?> crearReto(@RequestBody Reto reto) {
        try {
            Reto nuevoReto = retoService.crearReto(reto);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoReto);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarReto(@PathVariable Long id, @RequestBody Reto reto) {
        try {
            Reto retoActualizado = retoService.actualizarReto(id, reto);
            return ResponseEntity.ok(retoActualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarReto(@PathVariable Long id) {
        try {
            retoService.eliminarReto(id);
            return ResponseEntity.ok(Map.of("mensaje", "Reto eliminado exitosamente"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/buscar")
    public ResponseEntity<List<Reto>> buscarRetosPorTitulo(@RequestParam String titulo) {
        List<Reto> retos = retoService.buscarRetosPorTitulo(titulo);
        return ResponseEntity.ok(retos);
    }
    
    @PostMapping("/{id}/responder")
    public ResponseEntity<?> responderReto(@PathVariable Long id, @RequestBody Map<String, Object> respuestaData) {
        try {
            Long usuarioId = Long.valueOf(respuestaData.get("usuarioId").toString());
            Integer opcionElegida = Integer.valueOf(respuestaData.get("opcionElegida").toString());
            
            Respuesta respuesta = retoService.responderReto(id, usuarioId, opcionElegida);
            return ResponseEntity.ok(respuesta);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/{id}/respuestas")
    public ResponseEntity<List<Respuesta>> obtenerRespuestasDeReto(@PathVariable Long id) {
        try {
            List<Respuesta> respuestas = retoService.obtenerRespuestasDeReto(id);
            return ResponseEntity.ok(respuestas);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
