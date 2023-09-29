import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { DetailComponent } from './components/pokemon/detail/detail.component';

const routes: Routes = [
  {
    path:'home',
    component : PokemonComponent
  },
  {
    path:'pokemon',
    component : PokemonComponent
  },
  {
    path:'pokemon-detail',
    component : DetailComponent
  },
  {
    path:'marvel',
    component : PokemonComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
