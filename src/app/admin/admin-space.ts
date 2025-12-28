import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-space',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-space.html',
  styleUrl: './admin-space.css',
})
export class AdminSpace {}