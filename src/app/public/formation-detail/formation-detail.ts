import { Component, OnInit } from '@angular/core';
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
  styleUrl: './formation-detail.css',
})
export class PublicFormationDetail implements OnInit {
  formation?: Formation;
  sessions: Session[] = [];
  registrationMessage: Record<string, string> = {};
  registrationStatus: Record<string, 'success' | 'error'> = {};

  constructor(
    private route: ActivatedRoute,
    private formationService: FormationService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    const formationId = this.route.snapshot.paramMap.get('id');
    if (formationId) {
      this.formation = this.formationService.getFormationById(formationId);
      this.sessions = this.sessionService.getSessionsByFormation(formationId);
    }
  }

  isSessionFull(session: Session): boolean {
    return session.candidatsInscrits.length >= session.maxInscrits;
  }

  onRegister(session: Session, email: string): void {
    const success = this.sessionService.registerCandidate(session.id, email);
    if (success) {
      this.registrationMessage[session.id] = 'Inscription confirmée !';
      this.registrationStatus[session.id] = 'success';
      this.sessions = this.sessionService.getSessionsByFormation(session.formationId);
    } else {
      this.registrationMessage[session.id] =
        "Impossible d'inscrire ce candidat (session complète ou email déjà utilisé).";
      this.registrationStatus[session.id] = 'error';
    }
  }
}