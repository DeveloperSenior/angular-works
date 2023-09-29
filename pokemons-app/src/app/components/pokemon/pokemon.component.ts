import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],

})
export class PokemonComponent implements OnInit{

  pokemonList!: any;
  displayedColumns: string[] = ['demo-name'];
  pokemons!: any[];
  detailPokemon!: any[];
  constructor(public service: PokemonService,
    public router: Router,){


  }

  ngOnInit() {
     this.service.getAllPokemon().then(
      (response) => {
        const body = response.body;
        console.log(body)
        this.pokemons =(body.results as any[])
        this.pokemonList = new MatTableDataSource(body.results)
      }
    )
  }

  loadInfoPokemon(url:string){
    this.service.getDetailPokemon(url)
    .then((response) => {
        this.detailPokemon = response.body;
        console.log(this.detailPokemon);
        this.router.navigate(['pokemon-detail'],{ queryParams: { pokemon: JSON.stringify(this.detailPokemon)}})
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.pokemonList.filter = filterValue.trim().toLowerCase();
  }

}
