import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Produto } from '@app/models/produto.model';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchTerm: string = '';
  
  @Input() produtos: Produto[] = []; // Declaração para receber a lista de produtos
  @Output() searchEvent = new EventEmitter<string>();

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.searchTerm = target.value;
      this.searchEvent.emit(this.searchTerm); // Emite o termo de pesquisa
    }
  }
}
