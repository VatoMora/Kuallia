package com.hackaton.Simula.dto;

import java.math.BigDecimal;

public class ProductoRequest {
    private String nombre;
    private String marca;
    private String modelo;
    private BigDecimal costo;
    private BigDecimal precio;
    private Integer unidades;
    private Long negocioId;

    public ProductoRequest() {
    }

    public ProductoRequest(String nombre, String marca, String modelo, BigDecimal costo, BigDecimal precio, Integer unidades, Long negocioId) {
        this.nombre = nombre;
        this.marca = marca;
        this.modelo = modelo;
        this.costo = costo;
        this.precio = precio;
        this.unidades = unidades;
        this.negocioId = negocioId;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public BigDecimal getCosto() {
        return costo;
    }

    public void setCosto(BigDecimal costo) {
        this.costo = costo;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public Integer getUnidades() {
        return unidades;
    }

    public void setUnidades(Integer unidades) {
        this.unidades = unidades;
    }

    public Long getNegocioId() {
        return negocioId;
    }

    public void setNegocioId(Long negocioId) {
        this.negocioId = negocioId;
    }
}
