import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-categoria-productos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categoria-productos.component.html',
  styleUrls: ['./categoria-productos.component.css']
})
export class CategoriaProductosComponent implements OnInit {
  categoriaId: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categoriaId = this.route.snapshot.paramMap.get('id');
  }

}
