import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-formateur',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-formateur.html',
  styleUrl: './add-formateur.css',
})
export class AddFormateur {
  @Output() hideDialogEvent = new EventEmitter<boolean>();

  nom = '';
  prenom = '';
  email = '';
  cin = '';
  phone: number | null = null;
  cv = '';
  specialite = '';
    constructor(private formateursService: FormateursService) {}
     @Output() hideDialogEvent = new EventEmitter<boolean>();