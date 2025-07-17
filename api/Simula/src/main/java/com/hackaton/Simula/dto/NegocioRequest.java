package com.hackaton.Simula.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NegocioRequest {
    private String nombre;
    private String giro;
    private String fotoBase64;
    private Long usuarioId;
}
