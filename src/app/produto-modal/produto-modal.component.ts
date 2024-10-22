import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Produto } from '@app/models/produto.model';
import { FetchHttp } from '@app/fetch.service';
import { FormsModule } from '@angular/forms'; // Importando o FormsModule

@Component({
  selector: 'produto-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './produto-modal.component.html',
  styleUrls: ['./produto-modal.component.css']
})
export class ProdutoModalComponent {
  @Input() modo: 'criar' | 'editar' | undefined;
  @Output() close = new EventEmitter<void>(); // Emissor de evento para fechar o modal
  name: string = '';
  price: number = 0;

  constructor(private fetchHttp: FetchHttp) {}

  Salvar() {
    const novoProduto: Produto = {
      Nome: this.name,
      Preco: this.price,
    };

    this.fetchHttp.createItem(novoProduto).subscribe({
      next: (response) => {
        alert('Produto criado com sucesso:'+ response.nome);
        this.close.emit(); // Fechar o modal após salvar
      },
      error: (error) => {
        console.error('Erro ao criar produto:', error);
      }
    });
  }

  onCancel() {
    this.close.emit(); // Emite o evento para fechar o modal
  }
}
