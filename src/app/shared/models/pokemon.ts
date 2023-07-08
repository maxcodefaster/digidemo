export type PokemonDetails = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  abilities: PokemonAbility[];
  types: PokemonType[];
  stats: PokemonStat[];
};

export type PokemonAbility = {
  ability: {
    name: string;
    url: string;
  };
};

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type PokemonApiListResult = {
  name: string;
  url: string;
};

export type PokeApiListResponse = {
  count: number;
  next: string;
  previous: string;
  results: PokemonApiListResult[];
};
