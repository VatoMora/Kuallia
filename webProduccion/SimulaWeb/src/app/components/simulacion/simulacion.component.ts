import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface Persona {
  nombre: string;
  telefono: string;
  email?: string;
  esCliente: boolean;
}

interface PlantillaMensaje {
  id: number;
  nombre: string;
  contenido: string;
  variables: string[];
}

@Component({
  selector: 'app-simulacion',
  imports: [CommonModule, FormsModule],
  templateUrl: './simulacion.component.html',
  styleUrls: ['./simulacion.component.css']
})
export class SimulacionComponent implements OnInit {
  negocioId: number = 0;
  
  // Estados del flujo
  pasoActual: number = 1;
  mostrandoResultados: boolean = false;
  generandoSimulacion: boolean = false;
  enviandoMensajes: boolean = false;
  mensajesEnviados: boolean = false;
  segundosRestantes: number = 10; // Contador para mostrar en la UI
  
  // Datos del formulario
  tipoNegocio: string = '';
  objetivoMejora: string = '';
  productoSeleccionado: string = '';
  
  // Resultados de la simulación
  estrategiaSeleccionada: string = '';
  cantidadPersonas: string = '';
  personasSeleccionadas: Persona[] = [];
  
  // Plantillas y mensaje
  plantillas: PlantillaMensaje[] = [
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
  plantillaSeleccionada: PlantillaMensaje | null = null;
  mensajePersonalizado: string = '';
  mostrarPrevisualizacion: boolean = false;
  valoresPlantilla: { [key: string]: string } = {};
  
  // Datos hardcodeados
  tiposNegocio = ['Papelería', 'Abarrotes', 'Peluquería'];
  objetivosMejora = [
    { valor: 'aumentar_ventas', texto: 'Aumentar ventas' },
    { valor: 'producto_menor_rotacion', texto: 'Producto de menor rotación' }
  ];
  
  productosHardcodeados: { [key: string]: string[] } = {
    'Papelería': ['Juegos de geometría', 'Cuadernos', 'Lápices', 'Plumas', 'Hojas blancas'],
    'Abarrotes': ['Leche', 'Pan', 'Refrescos', 'Galletas', 'Detergente'],
    'Peluquería': ['Corte de cabello', 'Tinte', 'Peinado', 'Manicure', 'Tratamiento capilar']
  };
  
  estrategiasDisponibles = [
    { valor: 'campana_whatsapp', texto: 'Generar campaña de difusión vía WhatsApp' },
    { valor: 'flyer_digital', texto: 'Generar flyer electrónico para publicidad digital' }
  ];
  
  opcionesPersonas = [
    { valor: 'todos', texto: 'Todos los contactos' },
    { valor: '20_personas', texto: '20 personas (público seleccionado)' }
  ];
  
  // Lista de personas hardcodeadas
  personasHardcodeadas: Persona[] = [
    { nombre: 'María García', telefono: '555-0101', email: 'maria@email.com', esCliente: true },
    { nombre: 'Juan Pérez', telefono: '555-0102', email: 'juan@email.com', esCliente: true },
    { nombre: 'Ana López', telefono: '555-0103', email: 'ana@email.com', esCliente: false },
    { nombre: 'Carlos Rodríguez', telefono: '555-0104', email: 'carlos@email.com', esCliente: true },
    { nombre: 'Laura Martínez', telefono: '555-0105', email: 'laura@email.com', esCliente: false },
    { nombre: 'Pedro Sánchez', telefono: '555-0106', email: 'pedro@email.com', esCliente: true },
    { nombre: 'Sofia Hernández', telefono: '555-0107', email: 'sofia@email.com', esCliente: true },
    { nombre: 'Diego González', telefono: '555-0108', email: 'diego@email.com', esCliente: false },
    { nombre: 'Valentina Díaz', telefono: '555-0109', email: 'valentina@email.com', esCliente: true },
    { nombre: 'Andrés Torres', telefono: '555-0110', email: 'andres@email.com', esCliente: true },
    { nombre: 'Camila Ruiz', telefono: '555-0111', email: 'camila@email.com', esCliente: false },
    { nombre: 'Fernando Vargas', telefono: '555-0112', email: 'fernando@email.com', esCliente: true },
    { nombre: 'Isabella Castro', telefono: '555-0113', email: 'isabella@email.com', esCliente: true },
    { nombre: 'Roberto Morales', telefono: '555-0114', email: 'roberto@email.com', esCliente: false },
    { nombre: 'Natalia Ortiz', telefono: '555-0115', email: 'natalia@email.com', esCliente: true },
    { nombre: 'Eduardo Silva', telefono: '555-0116', email: 'eduardo@email.com', esCliente: true },
    { nombre: 'Lucía Ramírez', telefono: '555-0117', email: 'lucia@email.com', esCliente: false },
    { nombre: 'Miguel Flores', telefono: '555-0118', email: 'miguel@email.com', esCliente: true },
    { nombre: 'Paula Jiménez', telefono: '555-0119', email: 'paula@email.com', esCliente: true },
    { nombre: 'Alejandro Mendoza', telefono: '555-0120', email: 'alejandro@email.com', esCliente: false }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.negocioId = +params['id'];
    });
    
    // Inicializar valores de plantilla por defecto
    this.valoresPlantilla['negocio'] = 'Mi Negocio';
    this.valoresPlantilla['telefono'] = '555-0100';
    this.valoresPlantilla['fecha'] = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('es-MX');
  }

  get productosDisponibles(): string[] {
    return this.productosHardcodeados[this.tipoNegocio] || [];
  }

  siguientePaso(): void {
    if (this.pasoActual === 3) {
      // Guardar valores de plantilla con el producto seleccionado
      this.valoresPlantilla['producto'] = this.productoSeleccionado;
      this.valoresPlantilla['precio'] = '$99';
      this.valoresPlantilla['descripcion'] = 'Producto de alta calidad';
      this.valoresPlantilla['descuento'] = '20';
      this.generarSimulacion();
    } else {
      this.pasoActual++;
    }
  }

  pasoAnterior(): void {
    if (this.pasoActual > 1) {
      this.pasoActual--;
    }
  }

  generarSimulacion(): void {
    this.generandoSimulacion = true;
    
    // Simular tiempo de procesamiento
    setTimeout(() => {
      this.generandoSimulacion = false;
      this.mostrandoResultados = true;
      this.estrategiaSeleccionada = 'campana_whatsapp'; // Por defecto seleccionamos WhatsApp
    }, 3000);
  }

  seleccionarEstrategia(estrategia: string): void {
    this.estrategiaSeleccionada = estrategia;
  }

  seleccionarCantidadPersonas(cantidad: string): void {
    this.cantidadPersonas = cantidad;
    
    if (cantidad === '20_personas') {
      // Seleccionar 20 personas aleatorias
      const personasAleatorias = [...this.personasHardcodeadas]
        .sort(() => Math.random() - 0.5)
        .slice(0, 20);
      this.personasSeleccionadas = personasAleatorias;
    } else {
      // Seleccionar todas las personas
      this.personasSeleccionadas = [...this.personasHardcodeadas];
    }
  }

  seleccionarPlantilla(plantilla: PlantillaMensaje): void {
    this.plantillaSeleccionada = plantilla;
    this.actualizarMensajePersonalizado();
  }
  
  actualizarMensajePersonalizado(): void {
    if (this.plantillaSeleccionada) {
      // Agregar un valor de ejemplo para el nombre
      this.valoresPlantilla['nombre'] = 'Cliente';
      this.valoresPlantilla['servicio'] = this.productoSeleccionado || 'servicio';
      this.valoresPlantilla['beneficio'] = '10% de descuento en tu próxima compra';
      
      this.mensajePersonalizado = this.procesarPlantilla(
        this.plantillaSeleccionada,
        this.valoresPlantilla
      );
    }
  }
  
  procesarPlantilla(plantilla: PlantillaMensaje, valores: { [key: string]: string }): string {
    let mensaje = plantilla.contenido;
    
    plantilla.variables.forEach(variable => {
      const valor = valores[variable] || `[${variable}]`;
      mensaje = mensaje.replace(new RegExp(`{{${variable}}}`, 'g'), valor);
    });
    
    return mensaje;
  }
  
  togglePrevisualizacion(): void {
    this.mostrarPrevisualizacion = !this.mostrarPrevisualizacion;
    if (this.mostrarPrevisualizacion && this.plantillaSeleccionada) {
      this.actualizarMensajePersonalizado();
    }
  }
  
  actualizarValorPlantilla(variable: string, valor: string): void {
    this.valoresPlantilla[variable] = valor;
    this.actualizarMensajePersonalizado();
  }
  
  ejecutarCampana(): void {
    // Primero mostrar previsualización si no se ha seleccionado plantilla
    if (!this.plantillaSeleccionada) {
      // Seleccionar plantilla por defecto
      this.plantillaSeleccionada = this.plantillas[0];
      this.actualizarMensajePersonalizado();
    }
    
    // Mostrar previsualización
    this.mostrarPrevisualizacion = true;
  }
  
  confirmarEnvio(): void {
    this.mostrarPrevisualizacion = false;
    this.enviandoMensajes = true;
    this.mensajesEnviados = false;
    
    // Simular envío de mensajes con loading de WhatsApp
    setTimeout(() => {
      this.enviandoMensajes = false;
      this.mensajesEnviados = true;
      this.segundosRestantes = 10; // Reiniciar contador
      
      // Actualizar contador cada segundo
      const intervalo = setInterval(() => {
        this.segundosRestantes--;
        if (this.segundosRestantes <= 0) {
          clearInterval(intervalo);
          this.router.navigate(['/ioemprendo']);
        }
      }, 1000);
    }, 3000);
  }
  
  cancelarEnvio(): void {
    this.mostrarPrevisualizacion = false;
  }

  volverANegocios(): void {
    this.router.navigate(['/ioemprendo']);
  }

  get puedeAvanzar(): boolean {
    switch (this.pasoActual) {
      case 1:
        return !!this.tipoNegocio;
      case 2:
        return !!this.objetivoMejora;
      case 3:
        return !!this.productoSeleccionado;
      default:
        return false;
    }
  }
}
