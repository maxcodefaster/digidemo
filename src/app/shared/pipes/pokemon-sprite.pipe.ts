import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'pokemonSprite',
  standalone: true,
})
export class PokemonSpritePipe implements PipeTransform {

  transform(pokemonUrl: string): string {
    // https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png
    const id: number = parseInt(pokemonUrl.split('/').slice(-2, -1)[0]);
    const zeroPatchedId: string = id < 10 ? `00${id}` : id < 100 ? `0${id}` : `${id}`;
    return `${environment.pokemonSpriteUrl}${zeroPatchedId}.png`;
  }

}
