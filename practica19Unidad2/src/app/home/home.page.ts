import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { User } from '../modelo/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  validations_form: FormGroup;
  sexos: Array<string>;
  matching_passwords_group: FormGroup;



  constructor(private fb: FormBuilder,
    private navCtrl: NavController) {
    this.validations_form = this.fb.group({
      nombre: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      edad: new FormControl('', Validators.required),
      sexo: new FormControl('', Validators.required),
      dni: new FormControl('', Validators.required),
      apellidosPadre: new FormControl('', Validators.required)
    }, { validators: [this.formularioNoValido()] });
  }

  ngOnInit(): void {

    this.sexos = [
      "Hombre",
      "Mujer"
    ];
  }

  formularioNoValido(): ValidatorFn {
    return (formGroup: FormGroup) => {
      const nombre: string = formGroup.get('nombre').value;
      const apellidos: string = formGroup.get('apellidos').value;

      if (false) return { isValid: false };
      //en pruebas. Siempre devuelve true
      return null;
    };
  }

  getIntEdad(){
    return(Number(this.validations_form.get('edad').value));
  }

  onSubmit(values) {
    let user: User = new User(values.username,
      values.name, values.lastname, values.email, values.gender, values.terms);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        user: JSON.stringify(user),
        numero: 3
      }
    };
    this.navCtrl.navigateForward('/user', navigationExtras);
  }//end_onSubmit



}//end_class
