import { Component, OnInit } from '@angular/core';
import { NavController, ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, ViewWillEnter{

  constructor(public navCtrl:NavController) {
    console.log('constructor home');
  }
  
  ionViewWillEnter(): void {
    console.log('ionViewWillEnter home');
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter home');
  }

  ionViewWillLeave(): void {
    console.log('ionViewWillLeave home');
  }

  ionViewDidLeave(){
    console.log('ionViewDidLeave home');
  }
  
  ngOnInit(): void {
    console.log('ngOnInit home');
  }

  goToPagina2(){
    this.navCtrl.navigateForward('/pagina2');
  }

}
