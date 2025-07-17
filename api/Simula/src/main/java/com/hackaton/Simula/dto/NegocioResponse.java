package com.hackaton.Simula.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NegocioResponse {
    private Long id;
    private String nombre;
    private String giro;
    private String fotoBase64;
    private LocalDate fechaCreacion;
    private Long usuarioId;
    private String usuarioNombre;
    private List<ProductoResponse> productos;
}
