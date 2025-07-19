package com.hackaton.Simula.services;

import com.hackaton.Simula.dto.NegocioRequest;
import com.hackaton.Simula.dto.NegocioResponse;
import com.hackaton.Simula.dto.ProductoResponse;
import com.hackaton.Simula.entities.Negocio;
import com.hackaton.Simula.entities.Usuario;
import com.hackaton.Simula.repositories.NegocioRepository;
import com.hackaton.Simula.repositories.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NegocioService {

    private final NegocioRepository negocioRepository;
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public NegocioService(NegocioRepository negocioRepository, UsuarioRepository usuarioRepository) {
        this.negocioRepository = negocioRepository;
        this.usuarioRepository = usuarioRepository;
    }
    
    
    @Transactional
    public NegocioResponse crearNegocio(NegocioRequest request) {
        // Validar que el nombre no esté vacío
        if (request.getNombre() == null || request.getNombre().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre del negocio no puede estar vacío");
        }
        
        // Validar que el usuario existe
        Usuario usuario = usuarioRepository.findById(request.getUsuarioId())
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        
        // Verificar que no exista un negocio con el mismo nombre para el usuario
        if (negocioRepository.existsByNombreAndUsuarioId(request.getNombre(), request.getUsuarioId())) {
            throw new IllegalArgumentException("Ya existe un negocio con ese nombre para este usuario");
        }
        
        // Crear el negocio
        Negocio negocio = new Negocio();
        negocio.setNombre(request.getNombre().trim());
        negocio.setGiro(request.getGiro());
        negocio.setFotoBase64(request.getFotoBase64());
        negocio.setUsuario(usuario);
        
        Negocio savedNegocio = negocioRepository.save(negocio);
        
        return convertToResponse(savedNegocio);
    }
    
    @Transactional(readOnly = true)
    public List<NegocioResponse> listarPorUsuario(Long usuarioId) {
        List<Negocio> negocios = negocioRepository.findByUsuarioIdOrderByFechaCreacionDesc(usuarioId);
        return negocios.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<NegocioResponse> listarPorUsuarioConProductos(Long usuarioId) {
        List<Negocio> negocios = negocioRepository.findByUsuarioIdWithProductos(usuarioId);
        return negocios.stream()
                .map(this::convertToResponseWithProductos)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public Optional<NegocioResponse> buscarPorId(Long id) {
        return negocioRepository.findById(id)
                .map(this::convertToResponse);
    }
    
    @Transactional(readOnly = true)
    public Optional<NegocioResponse> buscarPorIdConProductos(Long id) {
        return negocioRepository.findById(id)
                .map(this::convertToResponseWithProductos);
    }
    
    @Transactional
    public void eliminar(Long id) {
        if (!negocioRepository.existsById(id)) {
            throw new IllegalArgumentException("Negocio no encontrado");
        }
        negocioRepository.deleteById(id);
    }
    
    @Transactional
    public NegocioResponse actualizar(Long id, NegocioRequest request) {
        Negocio negocio = negocioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Negocio no encontrado"));
        
        // Validar que el nombre no esté vacío
        if (request.getNombre() == null || request.getNombre().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre del negocio no puede estar vacío");
        }
        
        // Verificar que no exista otro negocio con el mismo nombre para el usuario
        if (!negocio.getNombre().equals(request.getNombre()) && 
            negocioRepository.existsByNombreAndUsuarioId(request.getNombre(), negocio.getUsuario().getId())) {
            throw new IllegalArgumentException("Ya existe un negocio con ese nombre para este usuario");
        }
        
        // Actualizar los campos
        negocio.setNombre(request.getNombre().trim());
        negocio.setGiro(request.getGiro());
        negocio.setFotoBase64(request.getFotoBase64());
        
        Negocio updatedNegocio = negocioRepository.save(negocio);
        
        return convertToResponse(updatedNegocio);
    }
    
    @Transactional(readOnly = true)
    public List<NegocioResponse> buscarPorGiro(String giro) {
        List<Negocio> negocios = negocioRepository.findByGiroContainingIgnoreCase(giro);
        return negocios.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<NegocioResponse> buscarPorNombre(String nombre) {
        List<Negocio> negocios = negocioRepository.findByNombreContainingIgnoreCase(nombre);
        return negocios.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    private NegocioResponse convertToResponse(Negocio negocio) {
        NegocioResponse response = new NegocioResponse();
        response.setId(negocio.getId());
        response.setNombre(negocio.getNombre());
        response.setGiro(negocio.getGiro());
        response.setFotoBase64(negocio.getFotoBase64());
        response.setFechaCreacion(negocio.getFechaCreacion());
        response.setUsuarioId(negocio.getUsuario().getId());
        response.setUsuarioNombre(negocio.getUsuario().getNombre());
        return response;
    }
    
    private NegocioResponse convertToResponseWithProductos(Negocio negocio) {
        NegocioResponse response = convertToResponse(negocio);
        
        if (negocio.getProductos() != null) {
            List<ProductoResponse> productos = negocio.getProductos().stream()
                    .map(producto -> {
                        ProductoResponse prodResponse = new ProductoResponse();
                        prodResponse.setId(producto.getId());
                        prodResponse.setNombre(producto.getNombre());
                        prodResponse.setMarca(producto.getMarca());
                        prodResponse.setModelo(producto.getModelo());
                        prodResponse.setCosto(producto.getCosto());
                        prodResponse.setPrecio(producto.getPrecio());
                        prodResponse.setUnidades(producto.getUnidades());
                        prodResponse.setNegocioId(producto.getNegocio().getId());
                        return prodResponse;
                    })
                    .collect(Collectors.toList());
            
            response.setProductos(productos);
        }
        
        return response;
    }
}
