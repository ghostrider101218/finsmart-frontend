import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ContactInfoComponent } from '../../components/contact-info/contact-info.component';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    ContactInfoComponent,
    ContactFormComponent
  ],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent {
  contactForm: FormGroup;
  enviando = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      asunto: ['informacion', Validators.required],
      mensaje: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.enviando = true;
      
      // Simular envío de formulario
      setTimeout(() => {
        this.enviando = false;
        this.snackBar.open('Mensaje enviado con éxito', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.contactForm.reset({
          asunto: 'informacion'
        });
      }, 1500);
    }
  }
} 