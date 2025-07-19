package com.hackaton.Simula.controllers;

import com.hackaton.Simula.entities.Usuario;
import com.hackaton.Simula.enums.Rol;
import com.hackaton.Simula.services.UsuarioService;
import com.hackaton.Simula.dto.PerfilUsuarioDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {
    
    @Autowired
    private UsuarioService usuarioService;
    
    @GetMapping
    public ResponseEntity<List<Usuario>> obtenerTodosLosUsuarios() {
        List<Usuario> usuarios = usuarioService.obtenerTodosLosUsuarios();
        return ResponseEntity.ok(usuarios);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerUsuarioPorId(@PathVariable Long id) {
        return usuarioService.obtenerUsuarioPorId(id)
                .map(usuario -> ResponseEntity.ok(usuario))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/email/{email}")
    public ResponseEntity<Usuario> obtenerUsuarioPorEmail(@PathVariable String email) {
        return usuarioService.obtenerUsuarioPorEmail(email)
                .map(usuario -> ResponseEntity.ok(usuario))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<?> crearUsuario(@RequestBody Usuario usuario) {
        try {
            Usuario nuevoUsuario = usuarioService.crearUsuario(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoUsuario);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping("/registro")
    public ResponseEntity<?> registrarUsuario(@RequestBody Usuario usuario) {
        try {
            // Validar que el email no esté registrado
            if (usuarioService.obtenerUsuarioPorEmail(usuario.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("error", "El email ya está registrado"));
            }
            
            // Validar que el usuario no esté registrado
            if (usuario.getUsuario() != null && usuarioService.obtenerUsuarioPorUsuario(usuario.getUsuario()).isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("error", "El nombre de usuario ya está registrado"));
            }
            
            // Asignar rol por defecto
            usuario.setRol(Rol.EMPRENDEDOR);
            
            Usuario nuevoUsuario = usuarioService.crearUsuario(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("mensaje", "Usuario registrado exitosamente", "usuario", nuevoUsuario));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        try {
            String email = credentials.get("email");
            String password = credentials.get("password");
            
            if (email == null || password == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Email y contraseña son requeridos"));
            }
            
            Usuario usuario = usuarioService.obtenerUsuarioPorEmail(email)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            
            // En un sistema real, deberías verificar la contraseña hasheada
            if (!usuario.getPassword().equals(password)) {
                return ResponseEntity.badRequest().body(Map.of("error", "Contraseña incorrecta"));
            }
            
            // No devolver la contraseña en la respuesta
            usuario.setPassword(null);
            
            return ResponseEntity.ok(usuario);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
        try {
            Usuario usuarioActualizado = usuarioService.actualizarUsuario(id, usuario);
            return ResponseEntity.ok(usuarioActualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable Long id) {
        try {
            usuarioService.eliminarUsuario(id);
            return ResponseEntity.ok(Map.of("mensaje", "Usuario eliminado exitosamente"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/rol/{rol}")
    public ResponseEntity<List<Usuario>> obtenerUsuariosPorRol(@PathVariable Rol rol) {
        List<Usuario> usuarios = usuarioService.obtenerUsuariosPorRol(rol);
        return ResponseEntity.ok(usuarios);
    }
    
    @GetMapping("/nivel/{nivel}")
    public ResponseEntity<List<Usuario>> obtenerUsuariosPorNivel(@PathVariable Integer nivel) {
        List<Usuario> usuarios = usuarioService.obtenerUsuariosPorNivel(nivel);
        return ResponseEntity.ok(usuarios);
    }
    
    @PutMapping("/{id}/saldo")
    public ResponseEntity<?> actualizarSaldo(@PathVariable Long id, @RequestBody Map<String, Double> saldoData) {
        try {
            Double nuevoSaldo = saldoData.get("saldo");
            Usuario usuarioActualizado = usuarioService.actualizarSaldo(id, nuevoSaldo);
            return ResponseEntity.ok(usuarioActualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/{id}/nivel")
    public ResponseEntity<?> actualizarNivel(@PathVariable Long id, @RequestBody Map<String, Integer> nivelData) {
        try {
            Integer nuevoNivel = nivelData.get("nivel");
            Usuario usuarioActualizado = usuarioService.actualizarNivel(id, nuevoNivel);
            return ResponseEntity.ok(usuarioActualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/{id}/perfil")
    public ResponseEntity<?> obtenerPerfilUsuario(@PathVariable Long id) {
        try {
            PerfilUsuarioDTO perfil = usuarioService.obtenerPerfilUsuario(id);
            return ResponseEntity.ok(perfil);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
