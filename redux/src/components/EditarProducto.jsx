import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const EditarProducto = () => {
    const dispatch = useDispatch();
    const producto = useSelector((state) => state.productos.productoEditar);

    const { nombre, precio, id } = producto;
    const [nombreEditar, setNombreEditar] = useState(nombre);
    const [precioEditar, setPrecioEditar] = useState(precio);
    return (
        <div className='row justify-content-center'>
            <div className='col-md-8'>
                <div className='card'>
                    <div className='card-body'>
                        <h2 className='text-center mb-4 font-weight-bold'>
                            Editar Producto
                        </h2>
                        <form>
                            <div className='form-group'>
                                <label>Nombre Producto</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Nombre producto'
                                    name='nombre'
                                    onChange={(e) =>
                                        setNombreEditar(e.target.value)
                                    }
                                    value={nombreEditar}
                                />
                            </div>
                            <div className='form-group'>
                                <label>Precio Producto</label>
                                <input
                                    type='number'
                                    className='form-control'
                                    placeholder='Precio de producto'
                                    name='precio'
                                    onChange={(e) =>
                                        setPrecioEditar(e.target.value)
                                    }
                                    value={precioEditar}
                                />
                            </div>
                            <div className='form-group'>
                                <input
                                    type='submit'
                                    value='Guardar cambios'
                                    className='btn btn-primary btn-block'
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarProducto;
