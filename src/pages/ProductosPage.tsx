import { useEffect, useState } from 'react';
import { getProductos } from '../services/product.service';
import type { Producto } from '../models/Product';
import logo from '../assets/image/logo.png';

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const data = await getProductos();
    setProductos(data);
  };

  const agregarAlCarrito = (producto: Producto) => {
    const carritoActual = JSON.parse(localStorage.getItem('carrito') || '[]');

    const existente = carritoActual.find((item: any) => item.id === producto.id);
    if (existente) {
      existente.cantidad += 1;
    } else {
      carritoActual.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1,
      });
    }

    localStorage.setItem('carrito', JSON.stringify(carritoActual));
  };

  return (
      <section style={{ backgroundColor: '#f8f9fa' }} className="py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold" style={{ color: '#1B4312' }}>
            Productos Disponibles
          </h2>
          <div className="row g-4">
            {productos.map((producto) => (
                <div key={producto.id} className="col-12 col-sm-6 col-md-4">
                  <div className="card h-100 shadow-sm border-0 cards-idle">
                    <img
                        src={`http://localhost:3000/uploads/productos/${producto.id}.jpg`}
                        alt={producto.nombre}
                        className="card-img-top bg-light"
                        style={{
                          height: '200px',
                          objectFit: 'contain',
                          borderRadius: '6px 6px 0 0',
                          padding: '10px'
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = logo;
                        }}
                    />

                    <div className="card-body d-flex flex-column justify-content-between">
                      <h5 className="card-title text-success fw-bold">{producto.nombre}</h5>
                      <p className="card-text" style={{ fontSize: '0.95rem' }}>
                        {producto.descripcion}
                      </p>
                      <div className="mt-auto">
                        <p className="mb-2 fw-bold">Precio: Bs. {producto.precio}</p>
                        <button
                            className="btn w-100"
                            style={{ backgroundColor: '#1B4312', color: '#fff', fontWeight: 'bold' }}
                            onClick={() => agregarAlCarrito(producto)}
                        >
                          Agregar al carrito
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
            ))}
            {productos.length === 0 && (
                <p className="text-center text-muted">No hay productos disponibles.</p>
            )}
          </div>
        </div>
      </section>
  );
}
