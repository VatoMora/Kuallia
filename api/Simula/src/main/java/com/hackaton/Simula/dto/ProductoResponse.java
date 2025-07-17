package com.hackaton.Simula.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductoResponse {
    private Long id;
    private String nombre;
    private String marca;
    private String modelo;
    private BigDecimal costo;
    private BigDecimal precio;
    private Integer unidades;
    private Long negocioId;
}
