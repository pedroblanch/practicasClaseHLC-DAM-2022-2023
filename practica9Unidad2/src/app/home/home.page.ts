import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LineaDetalle } from '../modelo/LineaDetalle';
import { Producto } from '../modelo/Producto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private productoSeleccionado: Producto;
  private codigoSeleccionado: number;
  private productos: Producto[] = [];
  private lineasDetalle: LineaDetalle[] = [];

  constructor(public alertController: AlertController) {
    this.productos.push(new Producto(1, "Producto 1", 10.3));
    this.productos.push(new Producto(2, "Producto 2", 25.3));
  }

  seleccionadoProducto(event) {
    //console.log(event.target.value);
    if (!this.codigoSeleccionado)
      return;
    this.productos.forEach(producto => {
      if (producto.codigo == this.codigoSeleccionado) {
        this.productoSeleccionado = producto;
      }
    });
    this.alertUnidadesProducto();
  }

  async alertUnidadesProducto() {
    const alert = await this.alertController.create({
      header: this.productoSeleccionado.codigo + ' - ' + this.productoSeleccionado.descripcion,
      inputs: [
        {
          type: 'number',
          name: 'unidades',
          placeholder: 'unidades',
          min: 1
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //borro la selección del ion-select
            this.codigoSeleccionado = null;
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: (data) => {
            let encontrado = false;
            let unidades = Number(data['unidades']);
            this.lineasDetalle.forEach((linea) => {
              if (linea.codigo == this.productoSeleccionado.codigo) {
                //ya está añadido el producto
                encontrado = true;
                //actualizo las unidades y el total
                linea.unidades += unidades;
                linea.total = linea.pvp * linea.unidades;
              }
            });
            if (!encontrado) {
              //el producto no ha sido aún añadido
              let lineaDetalle = new LineaDetalle(
                this.productoSeleccionado.codigo,
                this.productoSeleccionado.descripcion,
                this.productoSeleccionado.pvp,
                unidades,
                this.productoSeleccionado.pvp * unidades
              );
              this.lineasDetalle.push(lineaDetalle);
            }
            //borro la selección del ion-select
            this.codigoSeleccionado = null;
          },
        }
      ]
    });

    await alert.present();
  }

}
