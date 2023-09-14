import { Injectable } from '@angular/core';
import { PokemonServiceBase } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService extends PokemonServiceBase {

  constructor(http: HttpClient) {
    super(http)
  }

  async getAllPokemon(): Promise<any> {
    return await new Promise<any>((resolve, reject) => {
      this.getSuiteServices().then((json) => {
        const { Pokemon } = json;
        this.get(`${Pokemon.host}${Pokemon.context}${Pokemon.services.pokemon}`, true).subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error)
        })
      });
    });
  }

}
