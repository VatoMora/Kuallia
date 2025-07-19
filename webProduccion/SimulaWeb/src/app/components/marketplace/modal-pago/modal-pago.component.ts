import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-pago',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-pago.component.html',
  styleUrls: ['./modal-pago.component.css']
})
export class ModalPagoComponent {
  @Input() total: number = 0;
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() pagoCompletado = new EventEmitter<void>();

  // Estados del modal
  mostrarFormulario = true;
  procesandoPago = false;
  pagoExitoso = false;

  // Datos de la tarjeta
  numeroTarjeta = '';
  cvv = '';
  fechaExpiracion = '';
  nombreTitular = '';

  // Errores de validación
  errores = {
    numeroTarjeta: '',
    cvv: '',
    fechaExpiracion: '',
    nombreTitular: ''
  };

  cerrar(): void {
    if (!this.procesandoPago) {
      this.cerrarModal.emit();
    }
  }

  formatearNumeroTarjeta(event: any): void {
    let valor = event.target.value.replace(/\s/g, '');
    let valorFormateado = '';
    
    for (let i = 0; i < valor.length; i++) {
      if (i > 0 && i % 4 === 0) {
        valorFormateado += ' ';
      }
      valorFormateado += valor[i];
    }
    
    this.numeroTarjeta = valorFormateado;
  }

  formatearFechaExpiracion(event: any): void {
    let valor = event.target.value.replace(/\D/g, '');
    
    if (valor.length >= 2) {
      valor = valor.substring(0, 2) + '/' + valor.substring(2, 4);
    }
    
    this.fechaExpiracion = valor;
  }

  validarFormulario(): boolean {
    let esValido = true;
    this.errores = {
      numeroTarjeta: '',
      cvv: '',
      fechaExpiracion: '',
      nombreTitular: ''
    };

    // Validar número de tarjeta
    const numeroLimpio = this.numeroTarjeta.replace(/\s/g, '');
    if (numeroLimpio.length !== 16) {
      this.errores.numeroTarjeta = 'El número de tarjeta debe tener 16 dígitos';
      esValido = false;
    }

    // Validar CVV
    if (this.cvv.length !== 3) {
      this.errores.cvv = 'El CVV debe tener 3 dígitos';
      esValido = false;
    }

    // Validar fecha de expiración
    if (this.fechaExpiracion.length !== 5) {
      this.errores.fechaExpiracion = 'Formato inválido (MM/YY)';
      esValido = false;
    } else {
      const [mes, año] = this.fechaExpiracion.split('/');
      const mesNum = parseInt(mes);
      if (mesNum < 1 || mesNum > 12) {
        this.errores.fechaExpiracion = 'Mes inválido';
        esValido = false;
      }
    }

    // Validar nombre del titular
    if (this.nombreTitular.trim().length < 3) {
      this.errores.nombreTitular = 'Ingrese el nombre del titular';
      esValido = false;
    }

    return esValido;
  }

  procesarPago(): void {
    if (!this.validarFormulario()) {
      return;
    }

    // Iniciar proceso de pago
    this.mostrarFormulario = false;
    this.procesandoPago = true;

    // Simular procesamiento del pago (3 segundos)
    setTimeout(() => {
      this.procesandoPago = false;
      this.pagoExitoso = true;

      // Emitir evento de pago completado después de mostrar la animación
      setTimeout(() => {
        this.pagoCompletado.emit();
      }, 2000);
    }, 3000);
  }

  soloNumeros(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  detectarTipoTarjeta(): string {
    const numero = this.numeroTarjeta.replace(/\s/g, '');
    
    if (numero.startsWith('4')) {
      return 'visa';
    } else if (numero.startsWith('5')) {
      return 'mastercard';
    } else if (numero.startsWith('3')) {
      return 'amex';
    }
    
    return 'generic';
  }
}
