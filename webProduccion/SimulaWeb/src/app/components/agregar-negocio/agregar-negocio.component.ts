import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NegocioService } from '../../services/negocio.service';
import { NegocioRequest } from '../../models/negocio.model';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-agregar-negocio',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregar-negocio.component.html',
  styleUrls: ['./agregar-negocio.component.css']
})
export class AgregarNegocioComponent implements OnInit {
  negocioForm: FormGroup;
  loading = false;
  error = '';
  usuarioId: number = 1; // Se obtendrá del AuthService
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private negocioService: NegocioService,
    private router: Router,
    private authService: AuthService
  ) {
    this.negocioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      giro: ['', [Validators.required, Validators.minLength(3)]],
      foto: [null]
    });
  }

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.usuarioId = currentUser.id;
    } else {
      this.error = 'No se pudo obtener la información del usuario logueado';
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      
      // Validar tipo de archivo
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(this.selectedFile.type)) {
        this.error = 'Por favor selecciona un archivo de imagen válido (JPEG, PNG, GIF).';
        this.selectedFile = null;
        this.imagePreview = null;
        return;
      }

      // Validar tamaño del archivo (máximo 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (this.selectedFile.size > maxSize) {
        this.error = 'El archivo es demasiado grande. El tamaño máximo es 5MB.';
        this.selectedFile = null;
        this.imagePreview = null;
        return;
      }

      this.error = '';
      
      // Crear preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  private convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        // Remover el prefijo "data:image/...;base64," para obtener solo la cadena Base64
        const base64Data = base64String.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async onSubmit(): Promise<void> {
    if (this.negocioForm.valid) {
      this.loading = true;
      this.error = '';

      try {
        let fotoBase64 = '';
        if (this.selectedFile) {
          fotoBase64 = await this.convertFileToBase64(this.selectedFile);
        }

        const negocioRequest: NegocioRequest = {
          nombre: this.negocioForm.get('nombre')?.value,
          giro: this.negocioForm.get('giro')?.value,
          fotoBase64: fotoBase64,
          usuarioId: this.usuarioId
        };

        this.negocioService.crearNegocio(negocioRequest).subscribe({
          next: (response) => {
            console.log('Negocio creado exitosamente:', response);
            this.router.navigate(['/ioemprendo/mis-negocios']);
          },
          error: (err) => {
            console.error('Error al crear negocio:', err);
            this.error = typeof err.error === 'string' ? err.error : 'Error al crear el negocio';
            this.loading = false;
          }
        });
      } catch (error) {
        console.error('Error al procesar la imagen:', error);
        this.error = 'Error al procesar la imagen';
        this.loading = false;
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.negocioForm.controls).forEach(key => {
      const control = this.negocioForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.negocioForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getFieldError(fieldName: string): string {
    const field = this.negocioForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) {
        return `${fieldName} es requerido`;
      }
      if (field.errors['minlength']) {
        return `${fieldName} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
      }
    }
    return '';
  }

  cancelar(): void {
    this.router.navigate(['/ioemprendo/mis-negocios']);
  }
}
