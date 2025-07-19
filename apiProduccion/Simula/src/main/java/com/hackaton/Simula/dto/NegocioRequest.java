package com.hackaton.Simula.dto;


public class NegocioRequest {
    private String nombre;
    private String giro;
    private String fotoBase64;
private Long usuarioId;

    public NegocioRequest() {
    }

    public NegocioRequest(String nombre, String giro, String fotoBase64, Long usuarioId) {
        this.nombre = nombre;
        this.giro = giro;
        this.fotoBase64 = fotoBase64;
        this.usuarioId = usuarioId;
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

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }
}
