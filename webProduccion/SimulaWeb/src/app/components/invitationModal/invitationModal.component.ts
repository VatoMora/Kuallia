import { Component } from '@angular/core';

@Component({
  selector: 'app-invitation-modal',
  templateUrl: './invitationModal.component.html',
  styleUrls: ['./invitationModal.component.css']
})
export class InvitationModalComponent {
  showCopiedMessage = false;

  openInvitationModal(event: Event): void {
    event.preventDefault();
    const modalElement = document.getElementById('invitationModal');
    if (modalElement) {
      const modal = new window.bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  copyInvitationLink(): void {
    navigator.clipboard.writeText('https://mi-negocio.com/invitacion').then(() => {
      this.showCopiedMessage = true;
      setTimeout(() => {
        this.showCopiedMessage = false;
      }, 3000);
    });
  }

  shareInvitation(): void {
    // Lógica para compartir invitación
    alert('Compartir la invitación aún no está implementado.');
  }
}

