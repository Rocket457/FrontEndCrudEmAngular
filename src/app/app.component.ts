import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReadComponent } from './read/read.component';
import { CreateComponent } from './create-button/create-button.component';
import { SearchComponent } from "./search/search.component";
import { ProdutoModalComponent } from './produto-modal/produto-modal.component'; 
import { FetchHttp } from './fetch.service';
import { Produto } from './models/produto.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule,
    SearchComponent, 
    CreateComponent,
    ReadComponent,
    ProdutoModalComponent, 
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];
  loading: boolean = true;
  isModalOpen: boolean = false;
  produtoSelecionado: Produto | null = null;
  modoModal: 'criar' | 'editar' | undefined;
  
  constructor(private fetchHttp: FetchHttp) {}

  ngOnInit() {
    this.getAll();
    setInterval(() => this.getAll(), 30000);
  }

  getAll() {
    this.loading = true;
    this.fetchHttp.getAll().subscribe({
      next: (data) => {
        this.produtos = data;
        this.produtosFiltrados = [...this.produtos];
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro:', error);
        this.loading = false;
      },
    });
  }

  onSearchTriggered(searchTerm: string) {
    if (searchTerm === '') {
      this.produtosFiltrados = [...this.produtos];
    } else {
      this.produtosFiltrados = this.produtos.filter(produto =>
        produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        produto.id?.toString().includes(searchTerm) ||
        produto.preco.toString().includes(searchTerm)
      );
    }
  }

  closeModal() {
    this.getAll()
    this.isModalOpen = false;
  }

  openCreateModal() {
    this.produtoSelecionado = null; // Para criar um novo produto
    this.isModalOpen = true;
    this.modoModal = 'criar'; // Define o modo para criar
}

onProdutoSelecionado(produto: Produto) {
    this.produtoSelecionado = produto;
    this.modoModal = 'editar'; // Define o modo para editar
    this.isModalOpen = true;
}

onDeleteProduct() {
  this.getAll()
}
}
