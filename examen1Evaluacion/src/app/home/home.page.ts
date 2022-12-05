import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Partido } from '../modelo/Partido';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public partidos: Partido[] = [
    new Partido("SANTA CLARA", "SAFAUR", 36, 62),
    new Partido("SIDERAL", "BETIS ESPARTINAS", 50, 46),
    new Partido("MAIRENA DEL ALJARAFE", "FRESAS", 66, 49)];

  public equipos: string[] = ["SIDERAL", "SANTA CLARA",
    "BETIS ESPARTINAS", "FRESAS",
    "MAIRENA DEL ALJARAFE", "SAFAUR"];

  public altaPartido: boolean = false;
  public gestionarMarcador: boolean = false;
  public partido: any;
  editandoMarcadorLocal: boolean = false;
  editandoMarcadorVisitante: boolean = false;

  validations_form: FormGroup;

  constructor(private fb: FormBuilder,
    private alertController: AlertController) {
    this.validations_form = this.fb.group({
      equipoLocal: new FormControl('', Validators.compose([
        Validators.pattern('^[a-zA-Z ]+$'),
        Validators.required
      ])),
      equipoVisitante: new FormControl('', Validators.compose([
        Validators.pattern('^[a-zA-Z ]+$'),
        Validators.required
      ]))
    });
  }

  onSubmit(values: any) {

    let encontrado: boolean;
    //busco el equipo local
    encontrado = false;
    this.equipos.forEach(equipo => {
      if (values['equipoLocal'] == equipo)
        encontrado = true;
    })
    if (!encontrado) {
      this.presentAlert('Equipo local no existe');
      return;
    }
    //busco el equipo visitante
    encontrado = false;
    this.equipos.forEach(equipo => {
      if (values['equipoVisitante'] == equipo)
        encontrado = true;
    })
    if (!encontrado) {
      this.presentAlert('Equipo visitante no existe');
      return;
    }
    //compruebo que el equipo local no es igual al visitante
    if (values['equipoLocal'] == values['equipoVisitante']) {
      this.presentAlert('Los dos equipos son iguales');
      return;
    }
    //compruebo que el partido no existe ya
    encontrado = false;
    this.partidos.forEach(partido => {
      if (values['equipoLocal'] == partido.equipoLocal
        && values['equipoVisitante'] == partido.equipoVisitante)
        encontrado = true;
    })
    if (encontrado) {
      this.presentAlert('El partido ya existe');
      return;
    }
    //si llega aquí todo está correcto
    this.pedirConfirmacion(values);
  }//onSubmit

  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async pedirConfirmacion(values: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.validations_form.reset;
            this.altaPartido = false;
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            let partido = new Partido(values['equipoLocal'],
              values['equipoVisitante'],
              0, 0);
            this.partidos.push(partido);
            this.altaPartido = false;
          },
        },
      ],
    });
    await alert.present();
  }//end_pedirConfirmacion

  altaPartidoChange() {
    this.validations_form.controls['equipoLocal'].setValue(null);
    this.validations_form.controls['equipoVisitante'].setValue(null);
  }

  partidoClick(partido: Partido) {
    this.partido = partido;
    this.gestionarMarcador = true;
  }

  cambiarMarcadorLocal(puntos: number) {
    this.partido.puntosLocal += puntos;
  }

  cambiarMarcadorVisitante(puntos: number) {
    this.partido.puntosVisitante += puntos;
  }

  cerrarGestionMarcador() {
    this.gestionarMarcador = false;
  }

  editarMarcadorLocal() {
    if (!this.editandoMarcadorLocal) {
      if (!this.editandoMarcadorVisitante) {
        this.editandoMarcadorLocal = true;
      }
    }
    else {
      this.editandoMarcadorLocal = false;
    }
  }

  editarMarcadorVisitante() {
    if (!this.editandoMarcadorVisitante) {
      if (!this.editandoMarcadorLocal) {
        this.editandoMarcadorVisitante = true;
      }
    }
    else {
      this.editandoMarcadorVisitante = false;
    }
  }

}//end_class
