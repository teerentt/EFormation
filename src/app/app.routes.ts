import { Routes } from '@angular/router';
import { AdminSpace } from './admin/admin-space';
import { GestionFormateurs } from './admin/gestion-formateurs/gestion-formateurs';

export const routes: Routes = [
    {
        path:'admin',
        component: AdminSpace,
    },
    {
        path:'gestion-formateurs',
        component: GestionFormateurs
    }
];
