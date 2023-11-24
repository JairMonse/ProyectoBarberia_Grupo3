import { BarberoInterface } from './../interfaces/barbero-interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BarberoService {

  constructor() { }

  listBarberos: BarberoInterface[] = [
    {
      id: 1, nombres: 'Axel Castro', especialidad: 'Corte de cabello masculino', experiencia: 5,
      telefono: 123456789, imageName: 'https://thumbs.dreamstime.com/b/foto-de-barberero-barbulista-barbudo-con-tijeras-barber%C3%ADa-en-gris-estudio-279613924.jpg', disponibilidad: true
    },
    {
      id: 2, nombres: 'María González', especialidad: 'Coloración de cabello', experiencia: 8,
      telefono: 987654321, imageName: 'https://i.pinimg.com/736x/ca/14/db/ca14db38ceb6bba11403c7ca785ba71f.jpg', disponibilidad: true
    },
    {
      id: 3, nombres: 'Carlos Ramírez', especialidad: 'Afeitado clásico', experiencia: 10,
      telefono: 555555555, imageName: 'https://c8.alamy.com/compes/2g4mtnj/corte-de-pelo-y-cuidado-de-la-barba-para-el-tipo-caucasico-en-barbershop-cuidado-del-cabello-2g4mtnj.jpg', disponibilidad: false
    },
    {
      id: 4, nombres: 'Laura Pérez', especialidad: 'Peinados de fiesta', experiencia: 6,
      telefono: 777777777, imageName: 'https://c8.alamy.com/compes/jma9eg/en-el-salon-de-peluqueria-femenina-sosteniendo-unas-tijeras-en-la-mano-sonriente-joven-peluquero-de-pie-en-el-salon-jma9eg.jpg', disponibilidad: true
    },
    {
      id: 5, nombres: 'Juan García', especialidad: 'Corte de barba', experiencia: 7,
      telefono: 111111111, imageName: 'https://static.vecteezy.com/system/resources/previews/011/668/379/non_2x/barbershop-close-up-of-man-haircut-master-does-the-hair-styling-in-barber-shop-close-up-master-barber-does-the-hairstyle-and-styling-with-scissors-concept-barbershop-photo.jpg', disponibilidad: true
    },
    {
      id: 6, nombres: 'Ana Martínez', especialidad: 'Manicura y pedicura', experiencia: 9,
      telefono: 999999999, imageName: 'https://img.freepik.com/fotos-premium/barberia-mujer-barbero-haciendo-corte-pelo-hombre-tijeras-peine_126362-561.jpg?w=2000', disponibilidad: true
    }
  ];

  post(newBarbero: BarberoInterface): boolean {
    try {
      this.listBarberos.push(newBarbero)
      return true;
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      return false;
    }
  }

  put(updatedBarbero: BarberoInterface): boolean {
    const index = this.listBarberos.findIndex(b => b.id === updatedBarbero.id);
    if (index !== -1) {
      this.listBarberos[index] = { ...this.listBarberos[index], ...updatedBarbero };
      return true;
    } else {
      return false;
    }
  }

  delete(id: number): boolean {
    const index = this.listBarberos.findIndex((barbero) => barbero.id === id);
    if (index !== -1) {
      this.listBarberos.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  get(): BarberoInterface[] {
    return this.listBarberos;
  }

}
