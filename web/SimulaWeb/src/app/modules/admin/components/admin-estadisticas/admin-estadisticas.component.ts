import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-estadisticas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-estadisticas.component.html',
  styleUrls: ['./admin-estadisticas.component.css']
})
export class AdminEstadisticasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
