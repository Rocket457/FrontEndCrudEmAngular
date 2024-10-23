import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '@app/models/produto.model';


@Component({
  selector: 'app-read',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './read.component.html',
  styleUrl: './read.component.css',
})

export class ReadComponent {
  @Input() produtos: Produto[] = [];
  @Input() loading: boolean = true;
  @Output() produtoSelecionado = new EventEmitter<Produto>();

  produtosVisiveis: Produto[] = []; // Produtos filtrados e visíveis

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
}
