package com.hackaton.Simula.dto;

import com.hackaton.Simula.enums.Rol;
import java.time.LocalDate;

public class PerfilUsuarioDTO {
    private Long id;
    private String nombre;
    private String email;
    private String telefono;
    private String fotoBase64;
    private LocalDate fechaNacimiento;
    private String estado;
    private String municipio;
    private Rol rol;
    private Double saldo;
    private Integer nivel;

    // Constructor vacío
    public PerfilUsuarioDTO() {}

    // Constructor con todos los campos
    public PerfilUsuarioDTO(Long id, String nombre, String email, String telefono, 
                           String fotoBase64, LocalDate fechaNacimiento, String estado, 
                           String municipio, Rol rol, Double saldo, Integer nivel) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.fotoBase64 = fotoBase64;
        this.fechaNacimiento = fechaNacimiento;
        this.estado = estado;
        this.municipio = municipio;
        this.rol = rol;
        this.saldo = saldo;
        this.nivel = nivel;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getFotoBase64() {
        return fotoBase64;
    }

    public void setFotoBase64(String fotoBase64) {
        this.fotoBase64 = fotoBase64;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getMunicipio() {
        return municipio;
    }

    public void setMunicipio(String municipio) {
        this.municipio = municipio;
    }

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }

    public Double getSaldo() {
        return saldo;
    }

    public void setSaldo(Double saldo) {
        this.saldo = saldo;
    }

    public Integer getNivel() {
        return nivel;
    }

    public void setNivel(Integer nivel) {
        this.nivel = nivel;
    }
}
