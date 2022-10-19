import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Producto } from '../modelo/Producto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private productoSeleccionado:Producto;
  private productos:Producto[]=[];

  constructor(public alertController:AlertController) {
    this.productos.push(new Producto(1,"Producto 1",10.3));
    this.productos.push(new Producto(2,"Producto 2",25.3));
    this.productos.push(new Producto(3,"Producto 3",65));
    this.productos.push(new Producto(4,"Producto 4",109.98));
    this.productos.push(new Producto(5,"Producto 5",45.7));
  }

  seleccionadoProducto(event){
    console.log(this.productoSeleccionado);
    this.alertUnidadesProducto();
  }

  async alertUnidadesProducto() {
    const alert = await this.alertController.create({
      header: this.productoSeleccionado.codigo + " - " + this.productoSeleccionado.descripcion,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Cancelado");
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: (data) => {
            console.log(this.productoSeleccionado.descripcion + "-" +  data['unidades']);
          },
        },
      ],      inputs: [
        {
          type: 'number',
          name: 'unidades',
          placeholder: 'unidades',
          min: 1
        }
      ],
    });

    await alert.present();
  }

}
