import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Resultado } from '../../interfaces/pokeapi';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tarjeta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta.component.html',
  styleUrl: './tarjeta.component.scss'
})
export class TarjetaComponent implements OnChanges{

  @Input() data?:Resultado;
  @Output() clic = new EventEmitter<string>();
  id:string = "0";

  extraerInformacion() {
    if(this.data){
      this.id = this.data.url.substring(34, this.data.url.length - 1);
    }
  }

  ngOnChanges(): void {
    this.extraerInformacion();
  }

}
