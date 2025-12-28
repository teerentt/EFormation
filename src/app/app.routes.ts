import { Routes } from '@angular/router';
import { AdminSpace } from './admin/admin-space';
import { GestionFormateurs } from './admin/gestion-formateurs/gestion-formateurs';
import { GestionFormations } from './admin/gestion-formations/gestion-formations';
import { GestionSessions } from './admin/gestion-sessions/gestion-sessions';
import { PublicFormationDetail } from './public/formation-detail/formation-detail';
import { PublicFormations } from './public/formations/formations';
import { PublicHome } from './public/home/home';
import { PublicLayout } from './public/layout/layout';
export const routes: Routes = [
    {
    path: '',
    component: PublicLayout,
    children: [
      {
        path: '',
        component: PublicHome,
      },
      {
        path: 'formations',
        component: PublicFormations,
      },
      {
        path: 'formations/:id',
        component: PublicFormationDetail,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminSpace,
  },
  {
    path: 'admin/formateurs',
    component: GestionFormateurs,
  },
  {
    path: 'admin/formations',
    component: GestionFormations,
  },
  {
    path: 'admin/sessions',
    component: GestionSessions,
  },
];
