import { Injectable } from '@nestjs/common';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imgUrl: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Donas de Homero',
    description: 'Caja de donas rosadas con chispas, las favoritas de Homero.',
    price: 5.99,
    stock: 100,
    imgUrl: 'https://simpsons-store.com/img/donas-homero.png',
  },
  {
    id: '2',
    name: 'Cerveza Duff',
    description: 'Cerveza clásica Duff, directamente desde Springfield.',
    price: 3.5,
    stock: 200,
    imgUrl: 'https://simpsons-store.com/img/duff-beer.png',
  },
  {
    id: '3',
    name: 'Hamburguesa Krusty',
    description: 'Hamburguesa Krusty Burger con queso extra.',
    price: 7.99,
    stock: 80,
    imgUrl: 'https://simpsons-store.com/img/krusty-burger.png',
  },
  {
    id: '4',
    name: 'Buzz Cola',
    description: 'Refresco con cafeína extrema, aprobado por Bart.',
    price: 2.25,
    stock: 150,
    imgUrl: 'https://simpsons-store.com/img/buzz-cola.png',
  },
  {
    id: '5',
    name: 'Saxofón de Lisa',
    description: 'Saxofón profesional usado por Lisa Simpson.',
    price: 299.99,
    stock: 5,
    imgUrl: 'https://simpsons-store.com/img/sax-lisa.png',
  },
  {
    id: '6',
    name: 'Monorriel de Springfield',
    description: 'Modelo a escala del famoso monorriel.',
    price: 49.99,
    stock: 20,
    imgUrl: 'https://simpsons-store.com/img/monorriel.png',
  },
  {
    id: '7',
    name: 'Figura de Burns',
    description: "Figura coleccionable del Sr. Burns diciendo 'Excellent'.",
    price: 19.99,
    stock: 60,
    imgUrl: 'https://simpsons-store.com/img/burns-figure.png',
  },
  {
    id: '8',
    name: 'Muñeco Radioactivo',
    description: 'Muñeco del Hombre Radioactivo para fans.',
    price: 14.99,
    stock: 90,
    imgUrl: 'https://simpsons-store.com/img/radioactive-man.png',
  },
  {
    id: '9',
    name: 'Patineta de Bart',
    description: 'Patineta clásica de Bart Simpson.',
    price: 89.99,
    stock: 15,
    imgUrl: 'https://simpsons-store.com/img/bart-skate.png',
  },
  {
    id: '10',
    name: 'Peluca de Marge',
    description: 'Peluca azul alta, idéntica a la de Marge.',
    price: 24.99,
    stock: 40,
    imgUrl: 'https://simpsons-store.com/img/marge-hair.png',
  },
  {
    id: '11',
    name: 'Revista Radioactive Man #1',
    description: 'Primer número del cómic favorito de Springfield.',
    price: 12.99,
    stock: 30,
    imgUrl: 'https://simpsons-store.com/img/comic-radioactive.png',
  },
  {
    id: '12',
    name: 'Llave del Kwik-E-Mart',
    description: 'Souvenir oficial del Kwik-E-Mart de Apu.',
    price: 4.99,
    stock: 120,
    imgUrl: 'https://simpsons-store.com/img/kwikemart-key.png',
  },
  {
    id: '13',
    name: 'Poster Itchy & Scratchy',
    description: 'Póster violento y divertido de Itchy & Scratchy.',
    price: 9.99,
    stock: 70,
    imgUrl: 'https://simpsons-store.com/img/itchy-scratchy.png',
  },
  {
    id: '14',
    name: 'Gorra de Moe',
    description: 'Gorra usada por Moe en su taberna.',
    price: 15.99,
    stock: 35,
    imgUrl: 'https://simpsons-store.com/img/moe-hat.png',
  },
  {
    id: '15',
    name: 'Café Springfield',
    description: 'Café fuerte para sobrevivir al día laboral.',
    price: 6.5,
    stock: 110,
    imgUrl: 'https://simpsons-store.com/img/springfield-coffee.png',
  },
  {
    id: '16',
    name: 'Reloj Nuclear',
    description: 'Reloj temático de la Planta Nuclear.',
    price: 34.99,
    stock: 25,
    imgUrl: 'https://simpsons-store.com/img/nuclear-clock.png',
  },
  {
    id: '17',
    name: "Camiseta D'oh!",
    description: 'Camiseta amarilla con la frase clásica de Homero.',
    price: 18.99,
    stock: 75,
    imgUrl: 'https://simpsons-store.com/img/doh-shirt.png',
  },
  {
    id: '18',
    name: 'Figura de Milhouse',
    description: 'Figura coleccionable de Milhouse Van Houten.',
    price: 16.99,
    stock: 45,
    imgUrl: 'https://simpsons-store.com/img/milhouse-figure.png',
  },
  {
    id: '19',
    name: 'Taza de Springfield',
    description: 'Taza oficial de la ciudad de Springfield.',
    price: 8.99,
    stock: 95,
    imgUrl: 'https://simpsons-store.com/img/springfield-mug.png',
  },
  {
    id: '20',
    name: 'Caja Sorpresa Simpsons',
    description: 'Caja con productos aleatorios de Los Simpsons.',
    price: 39.99,
    stock: 10,
    imgUrl: 'https://simpsons-store.com/img/mystery-box.png',
  },
];

@Injectable()
export class ProductsRepository {
  getAllProducts() {
    return products;
  }
}
