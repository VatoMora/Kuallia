import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent {
  @Input() isOpen = false;
  @Input() total = 0;
  @Output() closeModal = new EventEmitter<void>();
  @Output() paymentSuccess = new EventEmitter<void>();

  // Estados del componente
  isProcessing = false;
  paymentCompleted = false;
  showSuccessAnimation = false;

  // Datos del formulario
  cardNumber = '';
  cardHolder = '';
  expiryDate = '';
  cvv = '';

  // Errores de validación
  errors = {
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  };

  close() {
    if (!this.isProcessing) {
      this.resetForm();
      this.closeModal.emit();
    }
  }

  resetForm() {
    this.cardNumber = '';
    this.cardHolder = '';
    this.expiryDate = '';
    this.cvv = '';
    this.isProcessing = false;
    this.paymentCompleted = false;
    this.showSuccessAnimation = false;
    this.errors = {
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: ''
    };
  }

  formatCardNumber(event: any) {
    let value = event.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    this.cardNumber = formattedValue;
  }

  formatExpiryDate(event: any) {
    let value = event.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    this.expiryDate = value;
  }

  validateForm(): boolean {
    let isValid = true;
    this.errors = {
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: ''
    };

    // Validar número de tarjeta
    const cardNumberClean = this.cardNumber.replace(/\s+/g, '');
    if (!cardNumberClean) {
      this.errors.cardNumber = 'El número de tarjeta es requerido';
      isValid = false;
    } else if (cardNumberClean.length !== 16) {
      this.errors.cardNumber = 'El número de tarjeta debe tener 16 dígitos';
      isValid = false;
    }

    // Validar nombre del titular
    if (!this.cardHolder.trim()) {
      this.errors.cardHolder = 'El nombre del titular es requerido';
      isValid = false;
    }

    // Validar fecha de vencimiento
    if (!this.expiryDate) {
      this.errors.expiryDate = 'La fecha de vencimiento es requerida';
      isValid = false;
    } else if (this.expiryDate.length !== 5) {
      this.errors.expiryDate = 'Formato inválido (MM/YY)';
      isValid = false;
    }

    // Validar CVV
    if (!this.cvv) {
      this.errors.cvv = 'El CVV es requerido';
      isValid = false;
    } else if (this.cvv.length !== 3) {
      this.errors.cvv = 'El CVV debe tener 3 dígitos';
      isValid = false;
    }

    return isValid;
  }

  async processPayment() {
    if (!this.validateForm()) {
      return;
    }

    this.isProcessing = true;

    // Simular proceso de pago (3 segundos)
    setTimeout(() => {
      this.isProcessing = false;
      this.paymentCompleted = true;
      this.showSuccessAnimation = true;

      // Emitir evento de éxito después de mostrar la animación
      setTimeout(() => {
        this.paymentSuccess.emit();
        setTimeout(() => {
          this.close();
        }, 1500);
      }, 2000);
    }, 3000);
  }

  getCardType(): string {
    const cardNumberClean = this.cardNumber.replace(/\s+/g, '');
    
    if (cardNumberClean.startsWith('4')) {
      return 'visa';
    } else if (cardNumberClean.startsWith('5')) {
      return 'mastercard';
    } else if (cardNumberClean.startsWith('3')) {
      return 'amex';
    }
    
    return 'generic';
  }
}
