import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService, Usuario } from '../../core/services/auth.service';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface FAQ {
  question: string;
  answer: string;
  keywords: string[];
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent implements OnInit, OnDestroy {
  isOpen = false;
  messages: Message[] = [];
  userInput = '';
  isTyping = false;
  currentUser: Usuario | null = null;
  private userSubscription: Subscription = new Subscription();

  faqs: FAQ[] = [
    {
      question: '¿Qué es Simula?',
      answer: 'Simula es una plataforma de simulación empresarial que te ayuda a practicar y mejorar tus habilidades de gestión de negocios en un entorno seguro y controlado.',
      keywords: ['simula', 'que es', 'plataforma']
    },
    {
      question: '¿Cómo puedo registrar mi negocio?',
      answer: 'Para registrar tu negocio, haz clic en "Agregar Negocio" en el menú principal, completa el formulario con la información de tu empresa y sigue las instrucciones.',
      keywords: ['registrar', 'negocio', 'agregar', 'empresa']
    },
    {
      question: '¿Qué tipos de simulaciones están disponibles?',
      answer: 'Ofrecemos simulaciones de: gestión financiera, marketing digital, recursos humanos, operaciones y estrategia empresarial.',
      keywords: ['simulaciones', 'tipos', 'disponibles']
    },
    {
      question: '¿Cómo funcionan los retos?',
      answer: 'Los retos son desafíos empresariales que te permiten ganar puntos y subir de nivel. Cada reto tiene objetivos específicos y recompensas al completarlos.',
      keywords: ['retos', 'desafíos', 'puntos', 'nivel']
    },
    {
      question: '¿Qué es KPIBuddy?',
      answer: 'KPIBuddy es tu asistente inteligente que te ayuda a monitorear y mejorar los indicadores clave de rendimiento (KPIs) de tu negocio simulado.',
      keywords: ['kpibuddy', 'kpi', 'indicadores', 'rendimiento']
    },
    {
      question: '¿Cómo puedo ver mis estadísticas?',
      answer: 'Puedes ver tus estadísticas en el panel de control, sección "Estadísticas" donde encontrarás gráficos y métricas de tu desempeño.',
      keywords: ['estadísticas', 'métricas', 'desempeño', 'panel']
    },
    {
      question: '¿Hay soporte disponible?',
      answer: 'Sí, ofrecemos soporte 24/7. Puedes contactarnos a través de este chat o enviar un correo a soporte[at]kuallia.com',
      keywords: ['soporte', 'ayuda', 'contacto', 'correo']
    },
    {
      question: '¿Cuánto vendiste esta semana?',
      answer: '🎉 ¡Muy bien! Vas mejorando. Si vendiste menos de $500, no te preocupes, todos empezamos desde abajo 💪. Si vendiste entre $500 y $1000, excelente progreso. Y si vendiste más de $1000, ¡eres una estrella! 🌟',
      keywords: ['vendiste', 'venta', 'semana', 'cuanto']
    },
    {
      question: '¿Cuántos clientes nuevos conseguiste?',
      answer: '👏 Cada cliente cuenta. Si aún no has conseguido clientes nuevos, no te desanimes, llegarán pronto 🌱. Si conseguiste entre 1 y 5, ¡buen trabajo! Y si conseguiste más de 5, ¡tu red está creciendo rápido! 🚀',
      keywords: ['clientes', 'nuevos', 'conseguiste', 'cuantos']
    },
    {
      question: '¿Cómo te sientes con tu progreso?',
      answer: '🤗 Es importante reconocer tus emociones. Si te sientes frustrada, es normal, ¡mañana será un mejor día! Si estás motivada, ¡esa es la actitud! 💯 Y si te sientes satisfecha, me alegra mucho, tu esfuerzo está dando frutos 🎊',
      keywords: ['sientes', 'progreso', 'frustrada', 'motivada', 'satisfecha']
    },
    {
      question: '¿En qué área necesitas más apoyo?',
      answer: 'Te puedo ayudar en diferentes áreas: 💼 Si necesitas apoyo en ventas, te prepararé tips especiales. 📱 Si es en marketing, tengo estrategias perfectas para ti. 💰 Y si necesitas ayuda con finanzas, te guiaré para mejorar tu gestión financiera.',
      keywords: ['apoyo', 'area', 'ventas', 'marketing', 'finanzas', 'ayuda']
    }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Suscribirse a los cambios del usuario autenticado
    this.userSubscription = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    
    // Mensaje de bienvenida
    const userName = this.currentUser?.nombre || '';
    const welcomeMessage = userName 
      ? `¡Hola ${userName} 🌸! Soy Kuallio 🤖, tu asistente virtual. ¿En qué puedo ayudarte hoy?`
      : '¡Hola! Soy Kuallio 🤖, tu asistente virtual. ¿En qué puedo ayudarte hoy?';
    this.addMessage(welcomeMessage, false);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (this.userInput.trim()) {
      this.addMessage(this.userInput, true);
      const userMessage = this.userInput.toLowerCase();
      this.userInput = '';
      
      this.isTyping = true;
      
      setTimeout(() => {
        const response = this.findBestResponse(userMessage);
        this.addMessage(response, false);
        this.isTyping = false;
      }, 1000);
    }
  }

  findBestResponse(message: string): string {
    // Buscar la mejor coincidencia en las FAQs
    let bestMatch: FAQ | null = null;
    let highestScore = 0;

    for (const faq of this.faqs) {
      let score = 0;
      
      // Verificar si alguna palabra clave está en el mensaje
      for (const keyword of faq.keywords) {
        if (message.includes(keyword)) {
          score += 1;
        }
      }
      
      if (score > highestScore) {
        highestScore = score;
        bestMatch = faq;
      }
    }

    if (bestMatch && highestScore > 0) {
      return bestMatch.answer;
    }

    // Respuestas predeterminadas
    if (message.includes('hola') || message.includes('hi')) {
      const userName = this.currentUser?.nombre || '';
      const greeting = userName ? `¡Hola ${userName}!` : '¡Hola!';
      return `${greeting} 🌸 ¿En qué puedo ayudarte? Puedes preguntarme sobre tus ventas, clientes nuevos, tu progreso o cualquier área donde necesites apoyo.`;
    }
    
    if (message.includes('gracias')) {
      return '¡De nada! Estoy aquí para ayudarte. ¿Hay algo más que quieras saber?';
    }
    
    if (message.includes('adios') || message.includes('bye')) {
      return '¡Hasta luego! Recuerda que estoy aquí cuando me necesites. ¡Éxito en tus simulaciones!';
    }

    return 'Lo siento, no entendí tu pregunta. ¿Podrías reformularla? Puedo ayudarte con información sobre Simula, registro de negocios, retos, KPIBuddy y más.';
  }

  addMessage(text: string, isUser: boolean) {
    this.messages.push({
      text,
      isUser,
      timestamp: new Date()
    });
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
}
