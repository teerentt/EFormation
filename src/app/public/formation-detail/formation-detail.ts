import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Formation } from '../../models/formations.model';
import { Session } from '../../models/session.model';
import { FormationService } from '../../admin/gestion-formations/formation.service';
import { SessionService } from '../../admin/gestion-sessions/sessions.service';
import { InscriptionForm } from '../inscription-form/inscription-form';

@Component({
  selector: 'app-public-formation-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, InscriptionForm],
  templateUrl:  './formation-detail.html',
  styleUrls: ['./formation-detail.css'],
})
export class PublicFormationDetail implements OnInit {
  formation = signal<Formation | null>(null);
  sessions = signal<Session[]>([]);
  registrationMessage = signal<Record<string, string>>({});
  registrationStatus = signal<Record<string, 'success' | 'error'>>({});

  constructor(
    private route: ActivatedRoute,
    private formationService: FormationService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    const formationId = this.route.snapshot.paramMap.get('id');
    if (formationId) {
      this.formation.set(this.formationService.getFormationById(formationId));
      this.sessions.set(this.sessionService.getSessionsByFormation(formationId));
    }
  }

  isSessionFull(session: Session): boolean {
    return session.candidatsInscrits.length >= session.maxInscrits;
  }

  onRegister(session: Session, email: string): void {
    const success = this.sessionService.registerCandidate(session.id, email);
    if (success) {
      this.registrationMessage.set({
        ...this.registrationMessage(),
        [session.id]: 'Inscription confirmAce !',
      });
      this.registrationStatus.set({
        ...this.registrationStatus(),
        [session.id]: 'success',
      });
      this.sessions.set(this.sessionService.getSessionsByFormation(session.formationId));
    } else {
      this.registrationMessage.set({
        ...this.registrationMessage(),
        [session.id]:
          "Impossible d'inscrire ce candidat (session complA\"te ou email dAcjAÿ utilisAc).",
      });
      this.registrationStatus.set({
        ...this.registrationStatus(),
        [session.id]: 'error',
      });
    }
  }
}



