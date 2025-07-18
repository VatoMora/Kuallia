import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('registerForm', { static: false }) formElement!: ElementRef;
  
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  success = '';
  
  selectedFile: File | null = null;
  fotoBase64 = '';
  
  private destroy$ = new Subject<void>();
  private announcer: HTMLElement | null = null;
  
  estados = [
    { nombre: 'Aguascalientes', municipios: ['Aguascalientes', 'Asientos', 'Calvillo'] },
    { nombre: 'Baja California', municipios: ['Mexicali', 'Tijuana', 'Ensenada'] },
    { nombre: 'Baja California Sur', municipios: ['La Paz', 'Los Cabos', 'Loreto'] },
    { nombre: 'Campeche', municipios: ['Campeche', 'Ciudad del Carmen', 'Champotón'] },
    { nombre: 'Chiapas', municipios: ['Tuxtla Gutiérrez', 'San Cristóbal de las Casas', 'Tapachula'] },
    { nombre: 'Chihuahua', municipios: ['Chihuahua', 'Ciudad Juárez', 'Delicias'] },
    { nombre: 'Coahuila', municipios: ['Saltillo', 'Torreón', 'Monclova'] },
    { nombre: 'Colima', municipios: ['Colima', 'Manzanillo', 'Tecomán'] },
    { nombre: 'Durango', municipios: ['Durango', 'Gómez Palacio', 'Lerdo'] },
    { nombre: 'Estado de México', municipios: ['Toluca', 'Ecatepec', 'Naucalpan'] },
    { nombre: 'Guanajuato', municipios: ['Guanajuato', 'León', 'Celaya'] },
    { nombre: 'Guerrero', municipios: ['Chilpancingo', 'Acapulco', 'Iguala'] },
    { nombre: 'Hidalgo', municipios: ['Pachuca', 'Tulancingo', 'Tizayuca'] },
    { nombre: 'Jalisco', municipios: ['Guadalajara', 'Zapopan', 'Tlaquepaque'] },
    { nombre: 'Michoacán', municipios: ['Morelia', 'Uruapan', 'Zamora'] },
    { nombre: 'Morelos', municipios: ['Cuernavaca', 'Jiutepec', 'Temixco'] },
    { nombre: 'Nayarit', municipios: ['Tepic', 'Bahía de Banderas', 'Xalisco'] },
    { nombre: 'Nuevo León', municipios: ['Monterrey', 'Guadalupe', 'San Nicolás'] },
    { nombre: 'Oaxaca', municipios: ['Oaxaca de Juárez', 'Salina Cruz', 'Juchitán'] },
    { nombre: 'Puebla', municipios: ['Puebla', 'Tehuacán', 'Atlixco'] },
    { nombre: 'Querétaro', municipios: ['Querétaro', 'San Juan del Río', 'Corregidora'] },
    { nombre: 'Quintana Roo', municipios: ['Chetumal', 'Cancún', 'Playa del Carmen'] },
    { nombre: 'San Luis Potosí', municipios: ['San Luis Potosí', 'Soledad de Graciano Sánchez', 'Ciudad Valles'] },
    { nombre: 'Sinaloa', municipios: ['Culiacán', 'Mazatlán', 'Los Mochis'] },
    { nombre: 'Sonora', municipios: ['Hermosillo', 'Ciudad Obregón', 'Nogales'] },
    { nombre: 'Tabasco', municipios: ['Villahermosa', 'Cárdenas', 'Comalcalco'] },
    { nombre: 'Tamaulipas', municipios: ['Ciudad Victoria', 'Reynosa', 'Matamoros'] },
    { nombre: 'Tlaxcala', municipios: ['Tlaxcala', 'Apizaco', 'Huamantla'] },
    { nombre: 'Veracruz', municipios: ['Xalapa', 'Veracruz', 'Coatzacoalcos'] },
    { nombre: 'Yucatán', municipios: ['Mérida', 'Valladolid', 'Tizimín'] },
    { nombre: 'Zacatecas', municipios: ['Zacatecas', 'Fresnillo', 'Guadalupe'] }
  ];
  
  municipios: string[] = [];
  
  private apiUrl = 'http://localhost:8080/api';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      usuario: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9_]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', [Validators.required, this.dateValidator]],
      estado: ['', [Validators.required]],
      municipio: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      privacy: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.setupAccessibilityFeatures();
    this.setupFormValidationAnnouncements();
  }
  
  ngAfterViewInit(): void {
    // Enfocar el primer campo del formulario
    setTimeout(() => {
      const firstInput = this.el.nativeElement.querySelector('#nombre');
      if (firstInput) {
        firstInput.focus();
      }
    }, 100);
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.announcer) {
      this.renderer.removeChild(document.body, this.announcer);
    }
  }
  
  private setupAccessibilityFeatures(): void {
    // Crear un elemento para anuncios de accesibilidad
    this.announcer = this.renderer.createElement('div');
    this.renderer.setAttribute(this.announcer, 'aria-live', 'polite');
    this.renderer.setAttribute(this.announcer, 'aria-atomic', 'true');
    this.renderer.addClass(this.announcer, 'visually-hidden');
    this.renderer.appendChild(document.body, this.announcer);
  }
  
  private setupFormValidationAnnouncements(): void {
    // Escuchar cambios en el formulario para anunciar errores
    this.registerForm.statusChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(status => {
        if (status === 'INVALID' && this.submitted) {
          this.announceFormErrors();
        }
      });
  }
  
  private announceFormErrors(): void {
    const errors = this.getFormErrors();
    if (errors.length > 0 && this.announcer) {
      const errorMessage = `Se encontraron ${errors.length} errores en el formulario: ${errors.join(', ')}`;
      this.renderer.setProperty(this.announcer, 'textContent', errorMessage);
    }
  }
  
  private getFormErrors(): string[] {
    const errors: string[] = [];
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      if (control && control.invalid && (control.dirty || control.touched)) {
        const errorMessage = this.getFieldError(key);
        if (errorMessage) {
          errors.push(`${this.getFieldLabel(key)}: ${errorMessage}`);
        }
      }
    });
    return errors;
  }

  get f() { return this.registerForm.controls; }

  dateValidator(control: AbstractControl) {
    if (!control.value) return null;
    
    const selectedDate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - selectedDate.getFullYear();
    
    if (age < 18) {
      return { underage: true };
    }
    
    return null;
  }

  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (!password || !confirmPassword) return null;
    
    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
}

  showPrivacyNotice(): void {
    const privacyContent = `
AVISO DE PRIVACIDAD - KUALLIA

Fecha de última actualización: ${new Date().toLocaleDateString('es-MX')}

1. RESPONSABLE DE SUS DATOS PERSONALES
Kuallia, con domicilio en [Tu dirección], es responsable del uso y protección de sus datos personales.

2. DATOS PERSONALES QUE RECABAMOS
Para las finalidades señaladas en el presente aviso de privacidad, podemos recabar sus datos personales de las siguientes categorías:
- Datos de identificación: nombre completo, nombre de usuario, fotografía
- Datos de contacto: correo electrónico, teléfono
- Datos demográficos: fecha de nacimiento, estado y municipio de residencia
- Datos de acceso: contraseña (encriptada)

3. FINALIDADES DEL TRATAMIENTO
Sus datos personales serán utilizados para:
- Crear y administrar su cuenta de usuario
- Brindarle acceso a los servicios de la plataforma
- Comunicarnos con usted sobre actualizaciones, promociones y servicios
- Mejorar nuestros servicios y experiencia de usuario
- Cumplir con obligaciones legales

4. PROTECCIÓN DE SUS DATOS
Implementamos medidas de seguridad administrativas, técnicas y físicas para proteger sus datos personales contra daño, pérdida, alteración, destrucción o uso no autorizado.

5. DERECHOS ARCO
Usted tiene derecho a:
- Acceder a sus datos personales
- Rectificar sus datos personales cuando sean inexactos o incompletos
- Cancelar sus datos personales
- Oponerse al tratamiento de sus datos personales

6. TRANSFERENCIA DE DATOS
No compartimos, vendemos ni transferimos sus datos personales a terceros sin su consentimiento, salvo las excepciones previstas en la Ley.

7. USO DE COOKIES
Utilizamos cookies para mejorar su experiencia en nuestra plataforma y analizar el uso del sitio.

8. CAMBIOS AL AVISO DE PRIVACIDAD
Nos reservamos el derecho de efectuar modificaciones o actualizaciones al presente aviso de privacidad.

9. CONTACTO
Para cualquier duda sobre el tratamiento de sus datos personales, puede contactarnos en: privacidad@kuallia.com

Al hacer clic en "Acepto", usted reconoce haber leído y aceptado los términos de este Aviso de Privacidad.
`;
    
    // Crear un mejor diálogo (por ahora usar alert, pero puedes implementar un modal más adelante)
    if (confirm(privacyContent + '\n\n¿Desea aceptar el aviso de privacidad?')) {
      this.registerForm.patchValue({ privacy: true });
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validar tamaño del archivo (máximo 2MB)
      if (file.size > 2 * 1024 * 1024) {
        this.error = 'El archivo debe ser menor a 2MB';
        return;
      }
      
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        this.error = 'Por favor selecciona un archivo de imagen válido';
        return;
      }
      
      this.selectedFile = file;
      
      // Convertir a base64
      const reader = new FileReader();
      reader.onload = (e) => {
        this.fotoBase64 = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onEstadoChange(): void {
    const estadoSeleccionado = this.f['estado'].value;
    const estado = this.estados.find(e => e.nombre === estadoSeleccionado);
    
    if (estado) {
      this.municipios = estado.municipios;
    } else {
      this.municipios = [];
    }
    
    // Limpiar municipio seleccionado
    this.f['municipio'].setValue('');
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';
    this.success = '';

    if (this.registerForm.invalid) {
      this.focusFirstInvalidField();
      this.announceFormErrors();
      return;
    }

    this.loading = true;
    
    const formData = {
      ...this.registerForm.value,
      fotoBase64: this.fotoBase64
    };
    
    // Remover confirmPassword y privacy del objeto a enviar
    delete formData.confirmPassword;
    delete formData.privacy;

    this.http.post(`${this.apiUrl}/usuarios/registro`, formData)
      .pipe(
        catchError((error) => {
          console.error('Error en registro:', error);
          
          if (error.error?.error) {
            this.error = error.error.error;
          } else {
            this.error = 'Error al registrar usuario. Intenta nuevamente.';
          }
          
          this.loading = false;
          return of(null);
        })
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.success = 'Usuario registrado exitosamente. Serás redirigido al login...';
            this.announceSuccess('Usuario registrado exitosamente');
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          }
        }
      });
  }

  getFieldError(field: string): string {
    const control = this.registerForm.get(field);
    if (control?.errors && (control.dirty || control.touched)) {
      if (control.errors['required']) {
        return `${this.getFieldLabel(field)} es requerido`;
      }
      if (control.errors['email']) {
        return 'Email no válido';
      }
      if (control.errors['minlength']) {
        const minLength = control.errors['minlength'].requiredLength;
        return `${this.getFieldLabel(field)} debe tener al menos ${minLength} caracteres`;
      }
      if (control.errors['pattern']) {
        if (field === 'usuario') {
          return 'El usuario solo puede contener letras, números y guiones bajos';
        }
        if (field === 'telefono') {
          return 'El teléfono debe tener exactamente 10 dígitos';
        }
      }
      if (control.errors['underage']) {
        return 'Debes ser mayor de 18 años para registrarte';
      }
      if (control.errors['requiredTrue']) {
        return 'Debes aceptar el aviso de privacidad para registrarte';
      }
    }
    
    if (field === 'confirmPassword' && this.registerForm.errors?.['passwordMismatch']) {
      return 'Las contraseñas no coinciden';
    }
    
    // Validaciones específicas para foto
    if (field === 'foto') {
      if (this.selectedFile && this.selectedFile.size > 2 * 1024 * 1024) {
        return 'El archivo debe ser menor a 2MB';
      }
    }
    
    return '';
  }
  
  private getFieldLabel(field: string): string {
    const labels: { [key: string]: string } = {
      nombre: 'Nombre',
      usuario: 'Usuario',
      email: 'Email',
      fechaNacimiento: 'Fecha de nacimiento',
      estado: 'Estado',
      municipio: 'Municipio',
      telefono: 'Teléfono',
      password: 'Contraseña',
      confirmPassword: 'Confirmar contraseña',
      privacy: 'Aviso de privacidad'
    };
    return labels[field] || field;
  }

  private focusFirstInvalidField(): void {
    const firstInvalidField = this.el.nativeElement.querySelector('.form-control.is-invalid, .form-control:invalid');
    if (firstInvalidField) {
      firstInvalidField.focus();
    }
  }
  
  private announceSuccess(message: string): void {
    if (this.announcer) {
      this.renderer.setProperty(this.announcer, 'textContent', message);
    }
  }
  
  private announceError(message: string): void {
    if (this.announcer) {
      this.renderer.setProperty(this.announcer, 'textContent', `Error: ${message}`);
    }
  }
  
  // Método para manejar teclas de accesibilidad
  onKeyDown(event: KeyboardEvent): void {
    // Permitir navegación con teclas de flecha en select
    if (event.target instanceof HTMLSelectElement) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const select = event.target as HTMLSelectElement;
        const currentIndex = select.selectedIndex;
        
        if (event.key === 'ArrowDown' && currentIndex < select.options.length - 1) {
          select.selectedIndex = currentIndex + 1;
        } else if (event.key === 'ArrowUp' && currentIndex > 0) {
          select.selectedIndex = currentIndex - 1;
        }
        
        // Disparar evento de cambio
        select.dispatchEvent(new Event('change'));
      }
    }
  }
  
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
