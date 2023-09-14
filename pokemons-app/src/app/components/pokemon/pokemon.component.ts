import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit{

  pokemonList!: any;
  displayedColumns: string[] = ['demo-name'];


  constructor(public service: PokemonService){}

    ngOnInit() {
     this.service.getAllPokemon().then(
      (response) => {
        const body = response.body;
        console.log(body)
        this.pokemonList = new MatTableDataSource(body.results)
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.pokemonList.filter = filterValue.trim().toLowerCase();
  }

}
