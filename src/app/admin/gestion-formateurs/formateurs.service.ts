import {Injectable,signal} from '@angular/core';
import { Formateur } from '../../models/formateur.model';
@Injectable({
    providedIn: 'root',
})
export class FormateursService {
    formateurs= signal<Formateur[]>([
        {
            id: 1,
            nom: 'Ahmed',
            prenom: 'Doe',
            email: 'john.doe@example.com',
            cin: 'A12345678',
            phone: 1234567890,
            cv: 'ahmed.pdf',
            specialite: ['Angular', 'TypeScript','SQL'],
        },
        {
            id: 2,
            nom: 'Sara',
            prenom: 'Smith',
            email: 'sara.smith@example.com',
            cin: 'B87654321',
            phone: 9876543210,
            cv: 'sara.pdf',
            specialite: ['React', 'JavaScript','Node.js'],
        },
        {
            id: 3,
            nom: 'Mohamed',
            prenom: 'Ali',
            email: 'mohamed.ali@example.com',
            cin: 'C11223344',
            phone: 5556667777,
            cv: 'mohamed.pdf',
            specialite: ['SQL', 'JavaScript','Python'],
        },
        {
            id: 4,
            nom: 'Lina',
            prenom: 'Khan',
            email: 'lina.khan@example.com',
            cin: 'D99887766',
            phone: 4443332222,
            cv: 'lina.pdf',
            specialite: ['React', 'JavaScript','Node.js','Angular'],
        },
        {
            id: 5,
            nom: 'Omar',
            prenom: 'Hassan',
            email: 'omar.hassan@example.com',
            cin: 'E55443322',
            phone: 3332221111,
            cv: 'omar.pdf',
            specialite: ['Angular', 'JavaScript','Python','Java','TypeScript'],
        }
    ]);

   
    getFormateurs() {
        return this.formateurs();
    }
    getFormateurById(id: number) {
        return this.formateurs().filter((formateur) => formateur.id === id);
    }
    addFormateur(formateur: Formateur) {
        this.formateurs().push(formateur);
    }
    updateFormateur(updatedFormateur: Formateur) {
        const index = this.formateurs().findIndex(
            (formateur) => formateur.id === updatedFormateur.id
        );
    }
    removeFormateur(id: number) {
        this.formateurs.set(
            this.formateurs().filter((formateur) => formateur.id !== id)
        );
    }
    getLastId(): number {
        return this.formateurs().length;
    }
}
