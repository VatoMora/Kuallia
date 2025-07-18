import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
export class ChatbotComponent {
  isOpen = false;
  messages: Message[] = [];
  userInput = '';
  isTyping = false;

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
    }
  ];

  constructor() {
    this.addMessage('¡Hola! Soy Kuallio 🤖, tu asistente virtual. ¿En qué puedo ayudarte hoy?', false);
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
      return '¡Hola! ¿En qué puedo ayudarte? Puedes preguntarme sobre Simula, cómo registrar tu negocio, los retos disponibles y más.';
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
