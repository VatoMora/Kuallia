import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// Declarar A-Frame para TypeScript
declare var AFRAME: any;

@Component({
  selector: 'app-realidad-virtual',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './realidad-virtual.component.html',
  styleUrls: ['./realidad-virtual.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RealidadVirtualComponent implements OnInit, OnDestroy {
  isVRSupported: boolean = false;
  isLoading: boolean = true;

  ngOnInit(): void {
    // Cargar A-Frame dinámicamente
    this.loadAFrame();
  }

  ngOnDestroy(): void {
    // Limpiar la escena al destruir el componente
    const scene = document.querySelector('a-scene');
    if (scene) {
      scene.remove();
    }
  }

  private loadAFrame(): void {
    // Verificar si A-Frame ya está cargado
    if (typeof AFRAME !== 'undefined') {
      this.initializeScene();
      return;
    }

    // Cargar A-Frame desde CDN
    const script = document.createElement('script');
    script.src = 'https://aframe.io/releases/1.5.0/aframe.min.js';
    script.onload = () => {
      this.initializeScene();
    };
    script.onerror = () => {
      console.error('Error al cargar A-Frame');
      this.isLoading = false;
    };
    document.head.appendChild(script);
  }

  private initializeScene(): void {
    // Esperar a que A-Frame esté completamente cargado
    setTimeout(() => {
      this.isLoading = false;
      this.checkVRSupport();
    }, 1000);
  }

  private checkVRSupport(): void {
    if ('xr' in navigator) {
      (navigator as any).xr.isSessionSupported('immersive-vr').then((supported: boolean) => {
        this.isVRSupported = supported;
      });
    }
  }
}
