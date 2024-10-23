import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
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
export class ProdutoModalComponent implements OnInit {
  @Input() modo: 'criar' | 'editar' | undefined;
  @Input() produto: Produto | null = null; // Uso de Produto como tipo
  @Output() close = new EventEmitter<void>(); // Emissor de evento para fechar o modal
  id: number | undefined; // Tornar o ID opcional, mas vai garantir que não será undefined no update
  name: string = '';
  price: number = 0;

  constructor(private fetchHttp: FetchHttp) {}

  ngOnInit() {
    if (this.modo === 'editar' && this.produto) {
      this.id = this.produto.id; // Acessar diretamente, pois estamos garantindo que produto não é nulo
      this.name = this.produto.nome;
      this.price = this.produto.preco;
    }
  }

  Salvar() {
    const novoProduto: Produto = {
      id: this.id,
      nome: this.name,
      preco: this.price,
    };

    if (this.modo === 'criar') {
      this.fetchHttp.createItem(novoProduto).subscribe({
        next: (response) => {
          alert('Produto criado com sucesso: ' + response.nome);
          this.close.emit(); // Fechar o modal após salvar
        },
        error: (error) => {
          console.error('Erro ao criar produto:', error);
        }
      });
    } else if (this.modo === 'editar') {
      if (this.id !== undefined) { // Garantir que id não é undefined
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
        console.error('ID do produto não está definido.'); // Lidar com o caso de ID indefinido
      }
    }
  }

  onCancel() {
    this.close.emit(); 
  }
}
