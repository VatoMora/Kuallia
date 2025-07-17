package com.hackaton.Simula.services;

import com.hackaton.Simula.entities.Usuario;
import com.hackaton.Simula.enums.Rol;
import com.hackaton.Simula.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    public List<Usuario> obtenerTodosLosUsuarios() {
        return usuarioRepository.findAll();
    }
    
    public Optional<Usuario> obtenerUsuarioPorId(Long id) {
        return usuarioRepository.findById(id);
    }
    
    public Optional<Usuario> obtenerUsuarioPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }
    
    public Usuario crearUsuario(Usuario usuario) {
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("Ya existe un usuario con este email");
        }
        return usuarioRepository.save(usuario);
    }
    
    public Usuario actualizarUsuario(Long id, Usuario usuarioActualizado) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    usuario.setNombre(usuarioActualizado.getNombre());
                    usuario.setEmail(usuarioActualizado.getEmail());
                    usuario.setPassword(usuarioActualizado.getPassword());
                    usuario.setRol(usuarioActualizado.getRol());
                    usuario.setSaldo(usuarioActualizado.getSaldo());
                    usuario.setNivel(usuarioActualizado.getNivel());
                    return usuarioRepository.save(usuario);
                })
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));
    }
    
    public void eliminarUsuario(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado con id: " + id);
        }
        usuarioRepository.deleteById(id);
    }
    
    public List<Usuario> obtenerUsuariosPorRol(Rol rol) {
        return usuarioRepository.findByRol(rol);
    }
    
    public List<Usuario> obtenerUsuariosPorNivel(Integer nivel) {
        return usuarioRepository.findByNivel(nivel);
    }
    
    public Usuario actualizarSaldo(Long id, Double nuevoSaldo) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    usuario.setSaldo(nuevoSaldo);
                    return usuarioRepository.save(usuario);
                })
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));
    }
    
    public Usuario actualizarNivel(Long id, Integer nuevoNivel) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    usuario.setNivel(nuevoNivel);
                    return usuarioRepository.save(usuario);
                })
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));
    }
}
