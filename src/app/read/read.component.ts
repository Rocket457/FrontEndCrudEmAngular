import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '@app/models/produto.model';
import { FetchHttp } from '@app/fetch.service';


@Component({
  selector: 'app-read',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './read.component.html',
  styleUrl: './read.component.css',
})

export class ReadComponent {
  constructor(private fetchHttp: FetchHttp) {}
  
  @Input() produtos: Produto[] = [];
  @Input() loading: boolean = true;
  @Output() produtoSelecionado = new EventEmitter<Produto>();

  produtosVisiveis: Produto[] = []; // Produtos filtrados e visíveis
  showContextMenu = false;
  contextMenuPosition = { x: 0, y: 0 };

  ngOnInit() {
    this.produtosVisiveis = this.produtos; 
  }

  // Atualiza a lista de produtos visíveis com base no filtro
  onProdutosFiltrados(produtos: Produto[]) {
    this.produtosVisiveis = produtos;
  }

  onProdutoClick(produto: Produto) {
    this.produtoSelecionado.emit(produto);
  }

  deleteProduct(produto: Produto) {
    if (produto.id !== undefined) {
      this.fetchHttp.deleteItem(produto.id).subscribe({
        next: () => {
          alert('Produto deletado com sucesso' );
        },
        error: (error: any) => {
          console.error('Erro ao deletar produto:', error);
        }
      });
    }else {
      console.warn('ID do produto está indefinido.');
    }
  }
  
}
