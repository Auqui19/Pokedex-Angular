import { Component, OnInit, inject } from '@angular/core';
import { TarjetaComponent } from '../../components/tarjeta/tarjeta.component';
import { DetalleComponent } from '../../components/detalle/detalle.component';
import { ApiService } from '../../services/api.service';
import { Resultado } from '../../interfaces/pokeapi';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../interfaces/pokemon';
import { ResponsiveDirective } from '../../directives/responsive.directive';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TarjetaComponent, DetalleComponent, CommonModule, ResponsiveDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  private _pokemonService = inject(ApiService);
  
  listaPokemon:Resultado[] = [];
  pokemonDetalle?:Pokemon;
  pagina:number = 1;

  ngOnInit(): void {
    this.cargarLista();
  }

  async cargarLista() {
    this.listaPokemon = [...this.listaPokemon, ... await this._pokemonService.getByPage(this.pagina)];
  }

  async clicTarjeta(id: string){
    this.pokemonDetalle = await this._pokemonService.getByID(id);
  }


}
