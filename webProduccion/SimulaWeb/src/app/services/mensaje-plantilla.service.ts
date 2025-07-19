import { Injectable } from '@angular/core';

export interface PlantillaMensaje {
  id: number;
  nombre: string;
  contenido: string;
  variables: string[]; // Variables que se pueden reemplazar en la plantilla
}

@Injectable({
  providedIn: 'root'
})
export class MensajePlantillaService {
  private plantillas: PlantillaMensaje[] = [
    {
      id: 1,
      nombre: 'Promoción de producto',
      contenido: '¡Hola {{nombre}}! 🎉\n\n¡Tenemos una oferta especial para ti!\n\n🛍️ {{producto}} con un {{descuento}}% de descuento\n💰 Precio especial: {{precio}}\n\n📍 Visítanos en {{negocio}}\n⏰ Oferta válida hasta {{fecha}}\n\n¡No te lo pierdas! 😊',
      variables: ['nombre', 'producto', 'descuento', 'precio', 'negocio', 'fecha']
    },
    {
      id: 2,
      nombre: 'Nuevo producto',
      contenido: '¡Hola {{nombre}}! 🌟\n\n¡Tenemos novedades en {{negocio}}!\n\n✨ Te presentamos: {{producto}}\n📝 {{descripcion}}\n💵 Precio de lanzamiento: {{precio}}\n\n¡Ven a conocerlo! Te esperamos 🙌',
      variables: ['nombre', 'negocio', 'producto', 'descripcion', 'precio']
    },
    {
      id: 3,
      nombre: 'Recordatorio de servicio',
      contenido: 'Hola {{nombre}} 👋\n\nTe recordamos que es momento de {{servicio}} 📅\n\n🏪 En {{negocio}} estamos listos para atenderte\n📞 Agenda tu cita al {{telefono}}\n\n¡Te esperamos pronto! 😊',
      variables: ['nombre', 'servicio', 'negocio', 'telefono']
    },
    {
      id: 4,
      nombre: 'Agradecimiento',
      contenido: '¡Hola {{nombre}}! 💝\n\nQueremos agradecerte por tu preferencia 🙏\n\nEn {{negocio}} valoramos tu confianza y queremos premiarte:\n🎁 {{beneficio}}\n\n¡Gracias por elegirnos! 🌟',
      variables: ['nombre', 'negocio', 'beneficio']
    }
  ];

  constructor() { }

  obtenerPlantillas(): PlantillaMensaje[] {
    return this.plantillas;
  }

  obtenerPlantillaPorId(id: number): PlantillaMensaje | undefined {
    return this.plantillas.find(p => p.id === id);
  }

  procesarPlantilla(plantilla: PlantillaMensaje, valores: { [key: string]: string }): string {
    let mensaje = plantilla.contenido;
    
    plantilla.variables.forEach(variable => {
      const valor = valores[variable] || `[${variable}]`;
      mensaje = mensaje.replace(new RegExp(`{{${variable}}}`, 'g'), valor);
    });
    
    return mensaje;
  }
}
