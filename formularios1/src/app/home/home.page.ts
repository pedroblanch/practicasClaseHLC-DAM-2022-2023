import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  genders: Array<string>;

  constructor(public formBuilder: FormBuilder,
    private navCtrl: NavController) {


  }

  ngOnInit(): void {

    this.genders = [
      "Male",
      "Female"
    ];

    this.validations_form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^[a-zA-Z]{1}[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+[@]{1}[a-zA-Z0-9-]+[.]{1}[a-zA-Z]+$')
      ])),
      gender: new FormControl(this.genders[0], Validators.required),
      terms: new FormControl(false, Validators.pattern('true'))
    });
  }//end_ngOnInit

  onSubmit(values) {
    let user:User=new User(values.username,
      values.name,values.lastname,values.email,values.gender,values.terms);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        user: JSON.stringify(user),
        numero: 3
      }
    };
    this.navCtrl.navigateForward('/user', navigationExtras);
  }//end_onSubmit



}//end_class
