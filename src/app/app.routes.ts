import { Routes } from '@angular/router';
import { ReadComponent } from './read/read.component';
import { CreateComponent } from './create-button/create-button.component';
import { SearchComponent } from "./search/search.component";
import { ProdutoModalComponent } from './produto-modal/produto-modal.component';

export const routes: Routes = [
    { path: 'read', component: ReadComponent },
    { path: 'create', component: CreateComponent },
    { path: 'search', component: SearchComponent },
    { path: 'modal', component: ProdutoModalComponent },
];
