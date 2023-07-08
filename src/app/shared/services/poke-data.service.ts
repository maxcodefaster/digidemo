import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';
import { PokeApiListResponse, PokemonDetails } from '../models';


@Injectable({
  providedIn: 'root',
})
export class PokeDataService {
  private readonly apiService: ApiService = inject(ApiService);

  public async getPokemonList(offset: number, limit: number): Promise<PokeApiListResponse> {
    return this.apiService.get<PokeApiListResponse>(`${environment.pokemonApiUrl}?offset=${offset}&limit=${limit}`);
  }

  public async getPokemonDetails(pokemonName: string): Promise<PokemonDetails> {
    return this.apiService.get<PokemonDetails>(`${environment.pokemonApiUrl}/${pokemonName}`);
  }

}
