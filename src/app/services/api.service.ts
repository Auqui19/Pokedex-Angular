import { Injectable, } from '@angular/core';
import { Resultado } from '../interfaces/pokeapi';
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  async getByPage(page: number, size: number = 151): Promise<Resultado[]> {
    const offset = size * (page - 1);
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${size}&offset=${offset}`);
    const resJson = await res.json();
    if (resJson.results.length > 0) return resJson.results
    return [];
  }

  async getByID(id: string): Promise<Pokemon> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return await res.json();
  }

  async getDescripcion(id:string | number):Promise<string> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const resJson = await res.json();
    const texto = resJson.flavor_text_entries.find((entry: any) => entry.language.name === "es");
    return texto.flavor_text;
  }

  async buscarPorNombre(nombre: string): Promise<Resultado[]> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
    const pokemon = await res.json();
    return [pokemon];
  }
  
  getDebilidades(tipo: string): string[] {
    switch (tipo) {
      case 'fire':
        return ['water', 'ground', 'rock']; // Debilidades para un Pokémon de tipo Fuego
      case 'water':
        return ['electric', 'grass']; // Debilidades para un Pokémon de tipo Agua
      case 'grass':
        return ['fire', 'ice', 'poison', 'flying', 'bug']; // Debilidades para un Pokémon de tipo Planta
      case 'electric':
        return ['ground']; // Debilidades para un Pokémon de tipo Eléctrico
      case 'ice':
        return ['fire', 'fighting', 'rock', 'steel']; // Debilidades para un Pokémon de tipo Hielo
      case 'fighting':
        return ['flying', 'psychic', 'fairy']; // Debilidades para un Pokémon de tipo Lucha
      case 'poison':
        return ['ground', 'psychic']; // Debilidades para un Pokémon de tipo Veneno
      case 'ground':
        return ['water', 'grass', 'ice']; // Debilidades para un Pokémon de tipo Tierra
      case 'flying':
        return ['electric', 'ice', 'rock']; // Debilidades para un Pokémon de tipo Volador
      case 'psychic':
        return ['bug', 'ghost', 'dark']; // Debilidades para un Pokémon de tipo Psíquico
      case 'bug':
        return ['fire', 'flying', 'rock']; // Debilidades para un Pokémon de tipo Bicho
      case 'rock':
        return ['water', 'grass', 'fighting', 'ground', 'steel']; // Debilidades para un Pokémon de tipo Roca
      case 'ghost':
        return ['ghost', 'dark']; // Debilidades para un Pokémon de tipo Fantasma
      case 'dragon':
        return ['ice', 'dragon', 'fairy']; // Debilidades para un Pokémon de tipo Dragón
      case 'dark':
        return ['fighting', 'bug', 'fairy']; // Debilidades para un Pokémon de tipo Siniestro
      case 'steel':
        return ['fire', 'fighting', 'ground']; // Debilidades para un Pokémon de tipo Acero
      case 'fairy':
        return ['poison', 'steel']; // Debilidades para un Pokémon de tipo Hada
      default:
        return []; // Si el tipo no tiene debilidades conocidas, devolver un array vacío
    }
  }
}
