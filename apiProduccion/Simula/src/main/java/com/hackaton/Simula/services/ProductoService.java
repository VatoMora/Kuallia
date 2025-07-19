package com.hackaton.Simula.services;

import com.hackaton.Simula.dto.ProductoRequest;
import com.hackaton.Simula.dto.ProductoResponse;
import com.hackaton.Simula.entities.Negocio;
import com.hackaton.Simula.entities.Producto;
import com.hackaton.Simula.repositories.NegocioRepository;
import com.hackaton.Simula.repositories.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductoService {
    
    private final ProductoRepository productoRepository;
    private final NegocioRepository negocioRepository;
    
    @Autowired
    public ProductoService(ProductoRepository productoRepository, NegocioRepository negocioRepository) {
        this.productoRepository = productoRepository;
        this.negocioRepository = negocioRepository;
    }
    
    public ProductoResponse crearProducto(ProductoRequest request) {
        // Validar que el negocio existe
        Negocio negocio = negocioRepository.findById(request.getNegocioId())
                .orElseThrow(() -> new IllegalArgumentException("Negocio no encontrado"));
        
        // Crear el nuevo producto
        Producto producto = new Producto();
        producto.setNombre(request.getNombre());
        producto.setMarca(request.getMarca());
        producto.setModelo(request.getModelo());
        producto.setCosto(request.getCosto());
        producto.setPrecio(request.getPrecio());
        producto.setUnidades(request.getUnidades());
        producto.setNegocio(negocio);
        
        Producto productoGuardado = productoRepository.save(producto);
        return convertirAResponse(productoGuardado);
    }
    
    public List<ProductoResponse> listarPorNegocio(Long negocioId) {
        List<Producto> productos = productoRepository.findByNegocioId(negocioId);
        return productos.stream()
                .map(this::convertirAResponse)
                .collect(Collectors.toList());
    }
    
    public ProductoResponse buscarPorId(Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));
        return convertirAResponse(producto);
    }
    
    public ProductoResponse actualizar(Long id, ProductoRequest request) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));
        
        // Verificar si se está cambiando el negocio
        if (!producto.getNegocio().getId().equals(request.getNegocioId())) {
            Negocio nuevoNegocio = negocioRepository.findById(request.getNegocioId())
                    .orElseThrow(() -> new IllegalArgumentException("Negocio no encontrado"));
            producto.setNegocio(nuevoNegocio);
        }
        
        // Actualizar campos
        producto.setNombre(request.getNombre());
        producto.setMarca(request.getMarca());
        producto.setModelo(request.getModelo());
        producto.setCosto(request.getCosto());
        producto.setPrecio(request.getPrecio());
        producto.setUnidades(request.getUnidades());
        
        Producto productoActualizado = productoRepository.save(producto);
        return convertirAResponse(productoActualizado);
    }
    
    public void eliminar(Long id) {
        if (!productoRepository.existsById(id)) {
            throw new IllegalArgumentException("Producto no encontrado");
        }
        productoRepository.deleteById(id);
    }
    
    private ProductoResponse convertirAResponse(Producto producto) {
        ProductoResponse response = new ProductoResponse();
        response.setId(producto.getId());
        response.setNombre(producto.getNombre());
        response.setMarca(producto.getMarca());
        response.setModelo(producto.getModelo());
        response.setCosto(producto.getCosto());
        response.setPrecio(producto.getPrecio());
        response.setUnidades(producto.getUnidades());
        response.setNegocioId(producto.getNegocio().getId());
        return response;
    }
}
