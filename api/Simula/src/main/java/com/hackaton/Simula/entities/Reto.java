package com.hackaton.Simula.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Entity
@Table(name = "retos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String titulo;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String descripcion;
    
    @Column(nullable = false)
    private String opcion1;
    
    @Column(nullable = false)
    private String opcion2;
    
    @Column(nullable = false)
    private Integer respuestaCorrecta; // 1 para opcion1, 2 para opcion2
    
    @Column(columnDefinition = "TEXT")
    private String retroalimentacion;
    
    @OneToMany(mappedBy = "reto", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Respuesta> respuestas;
    
    // Getters y Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitulo() {
        return titulo;
    }
    
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    
    public String getDescripcion() {
        return descripcion;
    }
    
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    
    public String getOpcion1() {
        return opcion1;
    }
    
    public void setOpcion1(String opcion1) {
        this.opcion1 = opcion1;
    }
    
    public String getOpcion2() {
        return opcion2;
    }
    
    public void setOpcion2(String opcion2) {
        this.opcion2 = opcion2;
    }
    
    public Integer getRespuestaCorrecta() {
        return respuestaCorrecta;
    }
    
    public void setRespuestaCorrecta(Integer respuestaCorrecta) {
        this.respuestaCorrecta = respuestaCorrecta;
    }
    
    public String getRetroalimentacion() {
        return retroalimentacion;
    }
    
    public void setRetroalimentacion(String retroalimentacion) {
        this.retroalimentacion = retroalimentacion;
    }
    
    public List<Respuesta> getRespuestas() {
        return respuestas;
    }
    
    public void setRespuestas(List<Respuesta> respuestas) {
        this.respuestas = respuestas;
    }
}
