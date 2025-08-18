import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { Producto } from '../../../modelos/producto.model';
import { CarritoService } from '../../../servicios/carrito.service';
import { FavoritosService } from '../../../servicios/favoritos.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
//Arreglo de objetos basado en el modelo
Productos: Producto[] = [
  {
    id: 1,
    nombre: 'Mouse Inalámbrico Logitech M170',
    descripcion: 'Mouse ergonómico con conexión inalámbrica por USB. Diseño compacto y eficiente.',
    precio: 19.99,
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Logitech_M170_Wireless_Mouse.png',
    disponibilidad: true,
    categoria:"mouse",
    marca:"logitech"
  },
  {
    id: 2,
    nombre: 'Teclado Mecánico Redragon Kumara',
    descripcion: 'Teclado con switches mecánicos Outemu Blue, ideal para gaming y escritura.',
    precio: 59.99,
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Redragon_Kumara_Keyboard.jpg/800px-Redragon_Kumara_Keyboard.jpg',
    disponibilidad: true,
    categoria:"Teclado",
    marca:"Redragon"
  },
  {
    id: 3,
    nombre: 'Auriculares JBL Tune 500',
    descripcion: 'Auriculares con sonido Pure Bass y control de llamadas. Conector 3.5 mm.',
    precio: 34.99,
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/JBL_TUNE_500BT_-_Auriculares_Bluetooth_inal%C3%A1mbricos_-_Bluetooth_wireless_headphones_-_front.jpg/800px-JBL_TUNE_500BT_-_Auriculares_Bluetooth_inal%C3%A1mbricos_-_Bluetooth_wireless_headphones_-_front.jpg',
    disponibilidad: true,
    categoria:"Auriculares",
    marca:"JBL"
  },
  {
    id: 4,
    nombre: 'SSD Kingston A400 480GB',
    descripcion: 'Unidad de estado sólido con interfaz SATA III. Lectura hasta 500MB/s.',
    precio: 42.50,
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Kingston_A400_SSD.jpg',
    disponibilidad: true,
    categoria:"disco duro",
    marca:"Kingston"
  },
  {
    id: 5,
    nombre: 'Cable HDMI 2.0 4K 2 metros',
    descripcion: 'Cable de alta velocidad compatible con resolución 4K y HDR.',
    precio: 8.99,
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/6/69/HDMI_Cable.jpg',
    disponibilidad: true,
    categoria:"cables",
    marca:"HDR"
  },
  {
    id: 6,
    nombre: 'Cámara Web Logitech C920 HD Pro',
    descripcion: 'Cámara Full HD 1080p con micrófono estéreo y enfoque automático.',
    precio: 89.99,
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Logitech_C920_HD_Pro_Webcam.jpg',
    disponibilidad: true,
    categoria:"camara",
    marca:"logitech"
  }
];




 // Constructor donde inyectamos los servicios
constructor(private carritoService: CarritoService,private favoritoService: FavoritosService) {}


// Método para agregar un producto al carrito
agregar(producto: Producto) {
  // Llama al método del servicio para agregar el producto al carrito
  this.carritoService.agregarAlCarrito(producto);

  // Muestra un mensaje de confirmación al usuario
  alert('Producto agregado al carrito');
}
//Metodo para agregar un prod a favoritos
agregarAFavorito(producto: Producto) {
    // Llama al método del servicio para agregar el producto favoritos
  this.favoritoService.agregarAFavoritos(producto);
    // Muestra un mensaje de confirmación al usuario

  alert('Producto agregado a favoritos');
}

searchTerm: string = '';

selectedCategory:string = '';
selectedBrand:string ='';
minprecio:number | null = null;
maxprecio:number | null = null;

get categories(): string[]{
  return [...new Set(this.Productos.map(p => p.categoria))];
}

get marca(): string[]{
  return [...new Set(this.Productos.map(p => p.marca))];
}

OnSearch(event:Event): void{
  event.preventDefault();
}

resetFilters(): void{
  this.searchTerm = '';
  this.selectedCategory = '';
  this.selectedBrand = '';
  this.minprecio = null;
  this.maxprecio = null;
}

get filteredProducts(): Producto[]{
  return this.Productos.filter(p =>
  (this.searchTerm ==='' || p.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
  (this.selectedCategory === '' || p.categoria === this.selectedCategory) &&
  (this.selectedBrand === '' || p.marca === this.selectedBrand) &&
  (this.minprecio === null || p.precio >= this.minprecio) &&
  (this.maxprecio === null || p.precio <= this.maxprecio)

)
}
}