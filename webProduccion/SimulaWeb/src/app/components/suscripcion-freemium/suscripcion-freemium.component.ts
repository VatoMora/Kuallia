import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface PlanFeature {
  icon: string;
  title: string;
  description: string;
}

interface PricingPlan {
  name: string;
  price: number;
  period: string;
  savings?: string;
  features: string[];
  highlighted?: boolean;
}

@Component({
  selector: 'app-suscripcion-freemium',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suscripcion-freemium.component.html',
  styleUrls: ['./suscripcion-freemium.component.css']
})
export class SuscripcionFreemiumComponent implements OnInit {
  selectedPlan: 'monthly' | 'annual' = 'monthly';
  isProcessing = false;
  showSuccessMessage = false;
  userName: string = '';

  plans: { monthly: PricingPlan; annual: PricingPlan } = {
    monthly: {
      name: 'Plan Mensual',
      price: 129,
      period: 'mes',
      features: [
        'Chatbot ilimitado con IA avanzada',
        'Acceso completo a la comunidad de emprendedores',
        'Análisis de KPIs en tiempo real',
        'Soporte prioritario 24/7',
        'Recursos educativos exclusivos',
        'Networking con otros emprendedores'
      ]
    },
    annual: {
      name: 'Plan Anual',
      price: 1290,
      period: 'año',
      savings: '¡Ahorra $258 al año!',
      features: [
        'Chatbot ilimitado con IA avanzada',
        'Acceso completo a la comunidad de emprendedores',
        'Análisis de KPIs en tiempo real',
        'Soporte prioritario 24/7',
        'Recursos educativos exclusivos',
        'Networking con otros emprendedores',
        'Webinars mensuales exclusivos',
        'Mentorías personalizadas (2 al año)'
      ],
      highlighted: true
    }
  };

  mainFeatures: PlanFeature[] = [
    {
      icon: 'fa-robot',
      title: 'Chatbot Ilimitado',
      description: 'Acceso sin restricciones a nuestro asistente de IA que te ayudará a resolver todas tus dudas empresariales'
    },
    {
      icon: 'fa-users',
      title: 'Comunidad Exclusiva',
      description: 'Conecta con miles de emprendedores, comparte experiencias y crea alianzas estratégicas'
    },
    {
      icon: 'fa-chart-line',
      title: 'Análisis Avanzado',
      description: 'Herramientas de análisis de KPIs y métricas para hacer crecer tu negocio'
    },
    {
      icon: 'fa-graduation-cap',
      title: 'Recursos Premium',
      description: 'Acceso a cursos, guías y material educativo actualizado constantemente'
    }
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Verificar si el usuario está autenticado
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    // Obtener el nombre del usuario
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.userName = currentUser.nombre || 'Emprendedor';
    }
  }

  selectPlan(plan: 'monthly' | 'annual'): void {
    this.selectedPlan = plan;
  }

  processPurchase(): void {
    this.isProcessing = true;
    
    // Simulamos el proceso de compra
    setTimeout(() => {
      this.isProcessing = false;
      this.showSuccessMessage = true;
      
      // Después de 3 segundos, redirigir al perfil
      setTimeout(() => {
        this.router.navigate(['/perfil']);
      }, 3000);
    }, 2000);
  }

  goBack(): void {
    this.router.navigate(['/perfil']);
  }

  getMonthlyPrice(): number {
    return this.selectedPlan === 'monthly' ? 129 : 107.50;
  }

  getTotalPrice(): number {
    return this.selectedPlan === 'monthly' ? 129 : 1290;
  }
}
