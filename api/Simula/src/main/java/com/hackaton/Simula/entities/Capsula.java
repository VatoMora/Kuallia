package com.hackaton.Simula.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.hackaton.Simula.enums.TipoCapsula;

@Entity
@Table(name = "capsulas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Capsula {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String titulo;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String contenido;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoCapsula tipo;
}
