import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { PokeApiListResponse, PokemonApiListResult, PokemonDetails } from '../shared/models';
import { PokeDataService } from '../shared/services/poke-data.service';
import { InfiniteScrollCustomEvent, IonModal } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('detailsModal') detailsModal: IonModal;
  public readonly authService: AuthService = inject(AuthService);
  public items: PokemonApiListResult[] = [];
  public totalItems: number = 0;
  public detailsItem: PokemonApiListResult | null = null;
  public pokemonDetails: PokemonDetails | null = null;

  private readonly pokeDataService: PokeDataService = inject(PokeDataService);
  private offset: number = 0;
  private limit: number = 20;

  ngOnInit() {
    this.loadPokemons(this.offset, this.limit);
  }

  public async openDetailsModal(item: PokemonApiListResult) {
    this.detailsItem = item;
    if (!this.detailsModal || !this.detailsItem) {return;}
    await Promise.all([
      this.loadPokemonDetails(),
      this.detailsModal.present(),
    ]);
  }

  public onCloseDetailsModal() {
    this.detailsItem = null;
    this.pokemonDetails = null;
  }

  public async onScrollEnd(e: Event) {
    this.offset += this.limit;
    await this.loadPokemons(this.offset, this.limit);
    await (e as InfiniteScrollCustomEvent).target.complete();
  }

  public handleImageError(e: Event) {
    (e.target as HTMLImageElement).src = '/assets/pokemon-placeholder.png';
  }

  private async loadPokemons(offset: number, limit: number) {
    const pokemonData: PokeApiListResponse = await this.pokeDataService.getPokemonList(offset, limit);
    if (!pokemonData) {return;}
    this.items = [...this.items, ...pokemonData.results];
    this.totalItems = pokemonData.count;
  }

  private async loadPokemonDetails() {
    if (!this.detailsItem) {return;}
    this.pokemonDetails = await this.pokeDataService.getPokemonDetails(this.detailsItem.name).catch(() => null);
  }

}
