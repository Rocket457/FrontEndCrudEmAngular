import { Component, Input, OnInit } from '@angular/core';
import { Produto } from '@app/models/produto.model';
import { FetchHttp } from '@app/fetch.service';
import { FormsModule } from '@angular/forms'; // Importando o FormsModule

@Component({
  selector: 'produto-modal',
  standalone: true,
  imports: [FormsModule], // Adicionando FormsModule às importações
  templateUrl: './produto-modal.component.html',
  styleUrls: ['./produto-modal.component.css']
})

export class ProdutoModalComponent {
  @Input() modo: 'criar' | 'editar' | undefined; // Define o modo do modal
  name: string = ''; // Para armazenar o nome do produto
  price: number = 0; // Para armazenar o preço do produto

  constructor(private fetchHttp: FetchHttp) {}

  Salvar() {

    const novoProduto: Produto = {
      Nome: this.name,
      Preco: this.price,
    };

    // Chame o método createItem no seu serviço
    this.fetchHttp.createItem(novoProduto).subscribe({
      next: (response) => {
        console.log('Produto criado com sucesso:', response);
        // Aqui você pode adicionar lógica para fechar o modal ou atualizar a lista de produtos
      },
      error: (error) => {
        console.error('Erro ao criar produto:', error);
        // Aqui você pode adicionar lógica para mostrar uma mensagem de erro
      }
    });
    } /*else {
        // Modo de edição
        this.fetchHttp.updateItem(this.produto).subscribe(
          (updatedItem) => {
            console.log('Produto atualizado:', updatedItem);
            this.close(); // Fechar o modal após a atualização
          },
          (error) => {
            console.error('Erro ao atualizar produto:', error);
          }
        );
      }*/
    }


