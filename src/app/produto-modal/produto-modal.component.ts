import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Produto } from '@app/models/produto.model';
import { FetchHttp } from '@app/fetch.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'produto-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './produto-modal.component.html',
  styleUrls: ['./produto-modal.component.css']
})
export class ProdutoModalComponent implements OnInit {
  @Input() modo: 'criar' | 'editar' | undefined;
  @Input() produto: Produto | null = null; 
  @Output() close = new EventEmitter<void>(); 
  id: number | undefined; 
  name: string = '';
  price: number = 0;

  constructor(private fetchHttp: FetchHttp) {}

  ngOnInit() {
    if (this.modo === 'editar' && this.produto) {
      this.id = this.produto.id
      this.name = this.produto.nome;
      this.price = this.produto.preco;
      document.body.style.overflow = 'hidden';
    }
  }

  Salvar() {
    document.body.style.overflow = 'auto';
    const novoProduto: Produto = {
      id: this.id,
      nome: this.name,
      preco: this.price,
    };

    if (this.modo === 'criar') {
      if (this.name !== "" || this.price !== 0) {

        this.fetchHttp.createItem(novoProduto).subscribe({

          next: (response) => {
            alert('Produto criado com sucesso: ' + response.nome);
            this.close.emit(); // Fechar o modal após salvar
          },
          error: (error) => {
            console.error('Erro ao criar produto:', error);
          }

        });
      } else {
          alert('Adicione um nome e um preço para o produto!')
      }

    } else if (this.modo === 'editar') {

      if (this.id !== undefined) { 

        this.fetchHttp.updateItem(this.id, novoProduto).subscribe({

          next: (response: { nome: string; }) => {
            alert('Produto atualizado com sucesso: ' + response.nome);
            this.close.emit();

          },
          error: (error: any) => {
            console.error('Erro ao atualizar produto:', error);
          }

        });
      } else {
        console.error('ID do produto não está definido.');
      }
    }
  }

  onCancel() {
    document.body.style.overflow = 'auto';
    this.close.emit(); 
  }
}
