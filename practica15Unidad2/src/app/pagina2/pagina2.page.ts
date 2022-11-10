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
  mensaje: string;
  
  constructor(private navCtrl: NavController, private activatedRoute: ActivatedRoute){
    this.activatedRoute.queryParams.subscribe(params => {
      this.alumno = JSON.parse(params["alumno"]);
    });
  }

  ngOnInit() {
    this.mensaje="nombre: "+this.alumno.nombre+" "+this.alumno.apellidos;
    this.mensaje+="\nedad: "+this.alumno.edad;
    this.mensaje+="\ndni: "+this.alumno.dni;
    this.mensaje+="\ndni padre: "+this.alumno.dniPadre;
    this.mensaje+="\ndni padre: "+this.alumno.dniMadre;
    this.mensaje+="\nsexo: "+this.alumno.sexo;
    this.mensaje+="\ntrabaja: "+this.alumno.trabaja;
    alert(this.mensaje);
  }

}
