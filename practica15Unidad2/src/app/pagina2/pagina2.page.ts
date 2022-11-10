import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Alumno } from '../modelo/Alumno';

@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.page.html',
  styleUrls: ['./pagina2.page.scss'],
})
export class Pagina2Page implements OnInit {

  
  alumno: Alumno;
  
  constructor(private navCtrl: NavController, private activatedRoute: ActivatedRoute){
    this.activatedRoute.queryParams.subscribe(params => {
      this.alumno = JSON.parse(params["alumno"]);
    });
  }

  ngOnInit() {
    console.log(this.alumno.nombre);
    console.log(this.alumno.apellidos);
    console.log(this.alumno.edad);
    console.log(this.alumno.dni);
    if (this.alumno.edad > 17) {
      console.log(this.alumno.estadoCivil);
      console.log(this.alumno.trabaja);
    } else {
      console.log(this.alumno.apellidosPadre);
      console.log(this.alumno.apellidosMadre);
      console.log(this.alumno.dniMadre);
      console.log(this.alumno.dniPadre);
    }
  }

}
