import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.scss'
})
export class DetalleComponent implements OnChanges {

  private _pokemonService = inject(ApiService)
  @Input() pokemon?: Pokemon;
  descripcion: string = "";
  debilidades: string[] = [];

  ngOnChanges(): void {
    if (this.pokemon) {
      this._pokemonService.getDescripcion(this.pokemon?.id).then(res => {
        this.descripcion = res
      })
      this.debilidades = this._pokemonService.getDebilidades(this.pokemon?.types[0].type.name);
    }

  }

  getMaxCP(): number {
    const maxCP = this.pokemon?.stats[1].base_stat || 0;
    return maxCP;
  }

  getMaxHP(): number {
    
    return this.pokemon?.stats[0].base_stat || 0; 
  }

  getAttack(): number {
    return this.pokemon?.stats[2].base_stat || 0; 
  }

  getDefense(): number {
    return this.pokemon?.stats[3].base_stat || 0; 
  }
  
  getStamina(): number {
    return this.pokemon?.stats[4].base_stat || 0; 
  }

  tiposColores: { [key: string]: string } = {
    "grass": "#74CB48",
    "fire": "#F57D31",
    "water": "#6493EB",
    "flying": "#A891EC",
    "bug": "#A7B723", 
    "normal": "#AAA67F",
    "poison": "#A43E9E",
    "electric": "#F9CF30",
    "ground": "#DEC16B",
    "fairy": "#E69EAC",
    "fighting": "#C12239",
    "psychic": "#FB5584",
    "rock": "#B69E31",
    "ghost": "#70559B",
    "ice": "#9AD6DF",
    "dragon": "#7037FF",
    "dark": "black",
    "steel": "#B7B9D0",
  };
}
