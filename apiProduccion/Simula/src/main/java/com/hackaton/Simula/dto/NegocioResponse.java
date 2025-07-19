package com.hackaton.Simula.dto;

import java.time.LocalDate;
import java.util.List;

public class NegocioResponse {
    private Long id;
    private String nombre;
    private String giro;
    private String fotoBase64;
    private LocalDate fechaCreacion;
    private Long usuarioId;
    private String usuarioNombre;
private List<ProductoResponse> productos;

    public NegocioResponse() {
    }

    public NegocioResponse(Long id, String nombre, String giro, String fotoBase64, LocalDate fechaCreacion, Long usuarioId, String usuarioNombre, List<ProductoResponse> productos) {
        this.id = id;
        this.nombre = nombre;
        this.giro = giro;
        this.fotoBase64 = fotoBase64;
        this.fechaCreacion = fechaCreacion;
        this.usuarioId = usuarioId;
        this.usuarioNombre = usuarioNombre;
        this.productos = productos;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getGiro() {
        return giro;
    }

    public void setGiro(String giro) {
        this.giro = giro;
    }

    public String getFotoBase64() {
        return fotoBase64;
    }

    public void setFotoBase64(String fotoBase64) {
        this.fotoBase64 = fotoBase64;
    }

    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getUsuarioNombre() {
        return usuarioNombre;
    }

    public void setUsuarioNombre(String usuarioNombre) {
        this.usuarioNombre = usuarioNombre;
    }

    public List<ProductoResponse> getProductos() {
        return productos;
    }

    public void setProductos(List<ProductoResponse> productos) {
        this.productos = productos;
    }
}
