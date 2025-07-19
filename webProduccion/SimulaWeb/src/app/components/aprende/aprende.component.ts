import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Curso {
  id: number;
  titulo: string;
  descripcion: string;
  tema: string;
  calificacion: number;
  progreso: number;
  duracion: string;
  icono: string;
}

@Component({
  selector: 'app-aprende',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aprende.component.html',
  styleUrls: ['./aprende.component.css']
})
export class AprendeComponent implements OnInit {
  cursos: Curso[] = [
    {
      id: 1,
      titulo: 'Tu Cliente es el Rey',
      descripcion: 'Descubre cómo conocer a tu cliente ideal. Aprende a identificar sus necesidades, crear un perfil detallado y entender qué problemas puedes resolver para ellos.',
      tema: 'Marketing y Ventas',
      calificacion: 4.8,
      progreso: 0,
      duracion: '45 min',
      icono: 'bi-people-fill'
    },
    {
      id: 2,
      titulo: 'Tu Negocio en Internet',
      descripcion: 'Construye tu presencia digital desde cero. Crea perfiles profesionales, páginas web sencillas y aprende a mostrar tus productos en línea sin gastar mucho.',
      tema: 'Presencia Digital',
      calificacion: 4.7,
      progreso: 0,
      duracion: '60 min',
      icono: 'bi-globe'
    },
    {
      id: 3,
      titulo: 'Vendiendo en Línea',
      descripcion: 'Domina las herramientas digitales de venta: WhatsApp Business, catálogos en línea y pagos digitales. Convierte visitantes en clientes.',
      tema: 'E-commerce',
      calificacion: 4.9,
      progreso: 0,
      duracion: '50 min',
      icono: 'bi-cart-check-fill'
    },
    {
      id: 4,
      titulo: 'Marketing Digital Sencillo',
      descripcion: 'Crea contenido atractivo para redes sociales. Aprende a contar tu historia, usar fotos y videos efectivos para conectar con más clientes.',
      tema: 'Marketing Digital',
      calificacion: 4.6,
      progreso: 0,
      duracion: '55 min',
      icono: 'bi-megaphone-fill'
    },
    {
      id: 5,
      titulo: 'Midiendo tu Éxito',
      descripcion: 'Analiza qué funciona en tu negocio. Mide el impacto de tus publicaciones, visitas y ventas para tomar mejores decisiones.',
      tema: 'Análisis y Métricas',
      calificacion: 4.5,
      progreso: 0,
      duracion: '40 min',
      icono: 'bi-graph-up-arrow'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Cargar progreso guardado del localStorage
    this.cargarProgreso();
  }

  cargarProgreso(): void {
    const progresoGuardado = localStorage.getItem('progreso-cursos');
    if (progresoGuardado) {
      const progreso = JSON.parse(progresoGuardado);
      this.cursos.forEach(curso => {
        if (progreso[curso.id]) {
          curso.progreso = progreso[curso.id];
        }
      });
    }
  }

  getEstrellas(calificacion: number): number[] {
    const estrellasLlenas = Math.floor(calificacion);
    return Array(5).fill(0).map((_, index) => {
      if (index < estrellasLlenas) return 1;
      if (index === estrellasLlenas && calificacion % 1 >= 0.5) return 0.5;
      return 0;
    });
  }

  iniciarCurso(curso: Curso): void {
    // Aquí puedes agregar la lógica para navegar al detalle del curso
    console.log('Iniciando curso:', curso.titulo);
    // this.router.navigate(['/aprende/curso', curso.id]);
  }

  getColorTema(tema: string): string {
    const colores: { [key: string]: string } = {
      'Marketing y Ventas': 'bg-primary',
      'Presencia Digital': 'bg-info',
      'E-commerce': 'bg-success',
      'Marketing Digital': 'bg-warning',
      'Análisis y Métricas': 'bg-danger'
    };
    return colores[tema] || 'bg-secondary';
  }

  getProgresoTexto(progreso: number): string {
    if (progreso === 0) return 'No iniciado';
    if (progreso === 100) return 'Completado';
    return `${progreso}% completado`;
  }
}
