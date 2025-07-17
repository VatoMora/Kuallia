import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-retos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-retos.component.html',
  styleUrls: ['./admin-retos.component.css']
})
export class AdminRetosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
