package com.hackaton.Simula.controllers;

import com.hackaton.Simula.dto.NegocioRequest;
import com.hackaton.Simula.dto.NegocioResponse;
import com.hackaton.Simula.services.NegocioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/negocios")
@CrossOrigin(origins = "*")
public class NegocioController {
    
private final NegocioService negocioService;
    
    @Autowired
    public NegocioController(NegocioService negocioService) {
        this.negocioService = negocioService;
    }
    
    @PostMapping
    public ResponseEntity<?> crearNegocio(@RequestBody NegocioRequest request) {
        try {
            NegocioResponse response = negocioService.crearNegocio(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error interno del servidor: " + e.getMessage());
        }
    }
    
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<?> listarPorUsuario(@PathVariable Long usuarioId) {
        try {
            List<NegocioResponse> negocios = negocioService.listarPorUsuario(usuarioId);
            return ResponseEntity.ok(negocios);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error interno del servidor: " + e.getMessage());
        }
    }
    
    @GetMapping("/usuario/{usuarioId}/productos")
    public ResponseEntity<?> listarPorUsuarioConProductos(@PathVariable Long usuarioId) {
        try {
            List<NegocioResponse> negocios = negocioService.listarPorUsuarioConProductos(usuarioId);
            return ResponseEntity.ok(negocios);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error interno del servidor: " + e.getMessage());
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            Optional<NegocioResponse> negocio = negocioService.buscarPorId(id);
            if (negocio.isPresent()) {
                return ResponseEntity.ok(negocio.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error interno del servidor: " + e.getMessage());
        }
    }
    
    @GetMapping("/{id}/productos")
    public ResponseEntity<?> buscarPorIdConProductos(@PathVariable Long id) {
        try {
            Optional<NegocioResponse> negocio = negocioService.buscarPorIdConProductos(id);
            if (negocio.isPresent()) {
                return ResponseEntity.ok(negocio.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error interno del servidor: " + e.getMessage());
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody NegocioRequest request) {
        try {
            NegocioResponse response = negocioService.actualizar(id, request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error interno del servidor: " + e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        try {
            negocioService.eliminar(id);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error interno del servidor: " + e.getMessage());
        }
    }
    
    @GetMapping("/buscar/giro")
    public ResponseEntity<?> buscarPorGiro(@RequestParam String giro) {
        try {
            List<NegocioResponse> negocios = negocioService.buscarPorGiro(giro);
            return ResponseEntity.ok(negocios);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error interno del servidor: " + e.getMessage());
        }
    }
    
    @GetMapping("/buscar/nombre")
    public ResponseEntity<?> buscarPorNombre(@RequestParam String nombre) {
        try {
            List<NegocioResponse> negocios = negocioService.buscarPorNombre(nombre);
            return ResponseEntity.ok(negocios);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error interno del servidor: " + e.getMessage());
        }
    }
}
