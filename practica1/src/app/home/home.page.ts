import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pulsadoBoton1:boolean=false;
  pulsadoBoton2:boolean=false;
  pulsadoBoton3:boolean=false;
  boton1Disabled:boolean=false;
  input1Disabled:boolean=false;
  input1Value:string;
  boton2Disabled:boolean=false;
  input2Disabled:boolean=false;
  input2Value:string;
  boton3Disabled:boolean=false;
  input3Disabled:boolean=false;
  input3Value:string;

  constructor() {
    //vacio   
  }

  ionViewWillEnter(){
  }

  clickBoton1(){
    if(this.input1Value){  //si tiene algun valor (no es null)
      this.pulsadoBoton1=true;
      this.boton1Disabled=true;
      this.input1Disabled=true;
    }
  }

  clickBoton2(){
    if(this.input2Value){  //si tiene algun valor (no es null)
      this.pulsadoBoton2=true;
      this.boton2Disabled=true;
      this.input2Disabled=true;
    }
  }

  clickBoton3(){
    if(this.input3Value){  //si tiene algun valor (no es null)
      this.pulsadoBoton3=true;
      this.boton3Disabled=true;
      this.input3Disabled=true;
    }
  }

  pierdeFoco(){
    console.log("pierde el foco");
  }

  teclaPulsada(){
    console.log("tecla pulsada");
  }

  cambiaValor(){
    console.log("cambia valor");
  }

  tomaFoco(){
    console.log("toma foco");
  }

}
