package com.hackaton.Simula.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "respuestas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Respuesta {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reto_id", nullable = false)
    private Reto reto;
    
    @Column(nullable = false)
    private Integer opcionElegida; // 1 para opcion1, 2 para opcion2
    
    @Column(nullable = false)
    private Boolean esCorrecta;
    
    @Column(nullable = false)
    private LocalDateTime fechaRespuesta = LocalDateTime.now();
    
    // Getters y Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Usuario getUsuario() {
        return usuario;
    }
    
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
    
    public Reto getReto() {
        return reto;
    }
    
    public void setReto(Reto reto) {
        this.reto = reto;
    }
    
    public Integer getOpcionElegida() {
        return opcionElegida;
    }
    
    public void setOpcionElegida(Integer opcionElegida) {
        this.opcionElegida = opcionElegida;
    }
    
    public Boolean getEsCorrecta() {
        return esCorrecta;
    }
    
    public void setEsCorrecta(Boolean esCorrecta) {
        this.esCorrecta = esCorrecta;
    }
    
    public LocalDateTime getFechaRespuesta() {
        return fechaRespuesta;
    }
    
    public void setFechaRespuesta(LocalDateTime fechaRespuesta) {
        this.fechaRespuesta = fechaRespuesta;
    }
}
