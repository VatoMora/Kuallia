package com.hackaton.Simula.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "negocios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Negocio {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nombre;
    
    @Column(nullable = false)
    private String giro;
    
    @Column(columnDefinition = "MEDIUMTEXT")
    private String fotoBase64;
    
    @Column(nullable = false)
    private LocalDate fechaCreacion;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
    
    @OneToMany(mappedBy = "negocio", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Producto> productos;
    
    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDate.now();
    }
    
    // Getters y Setters
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
    
    public Usuario getUsuario() {
        return usuario;
    }
    
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
    
    public List<Producto> getProductos() {
        return productos;
    }
    
    public void setProductos(List<Producto> productos) {
        this.productos = productos;
    }
}
