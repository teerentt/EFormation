import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
@Component({
  selector: 'app-admin-space',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin-space.html',
  styleUrls: ['./admin-space.css'],
})
export class AdminSpace { }