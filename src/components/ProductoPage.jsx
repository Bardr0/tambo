import { useState, useEffect } from 'react'
import { useForm } from '../hooks/useForm';
import { actualizarProductoAPI, eliminarProductoAPI, insertarProductoAPI, listarCategoriasAPI, listarProductosAPI, obtenerProductoAPI } from '../services/productoService';

const ProductoPage = () => {

    const [filtroIdCategoria, setFiltroIdCategoria] = useState(-1);
    const [listaCategorias, setListaCategorias] = useState([]);
    const [productos, setProductos] = useState([]);
    const [errores, setErrores] = useState([]);
    const [error, setError] = useState({
        nombre: '',
        descri: '',
        preUni: ''
    });

    const {
        idProducto,
        idCategoria,
        nombre,
        descri,
        preUni,
        formState,
        setFormState,
        onInputChange,
        onResetForm } = useForm({
            idProducto: '',
            idCategoria: '',
            nombre: '',
            descri: '',
            preUni: ''
        });

    const listarCategorias = async () => {
        const data = await listarCategoriasAPI();
        setListaCategorias(data);
    }

    const listarProductos = async () => {
        const data = await listarProductosAPI(filtroIdCategoria);
        setProductos(data);
    }

    const insertarProducto = async () => {
        const data = await insertarProductoAPI(formState);
        if (data.type === 'success') {
            alert(data.message);
            onResetForm();
            setErrores([]);
            setError({
                nombre: '',
                descri: '',
                preUni: ''
            });
            await listarProductos();
        } if (data.type === 'validation') {
            setErrores(data.data);
        } if (data.type === 'required') {
            setError(data.data)
        } else {
            console.log(data);
        }

    }

    const actualizarProducto = async () => {
        const data = await actualizarProductoAPI(formState);

        if (data.type === 'success') {
            alert(data.message);
            onResetForm();
        setErrores([]);
            setError({
                nombre: '',
                descri: '',
                preUni: ''
            });
            await listarProductos();
        } if (data.type === 'validation') {
            setErrores(data.data);
        } if (data.type === 'required') {
            setError(data.data)
        } else {
            console.log(data);
        }
    }

    const obtenerProducto = async (id) => {
        const data = await obtenerProductoAPI(id);
        setFormState({
            idProducto: data.idProducto,
            idCategoria: data.categoria.idCategoria,
            nombre: data.nombre,
            descri: data.descri,
            preUni: data.preUni
        });
    }

    const eliminarProducto = async (id) => {
        if (!confirm('¿Seguro que desea eliminar el producto?')) return;
        const data = await eliminarProductoAPI(id);
   if (data.type === 'success') {
            alert(data.message);
            onResetForm();
        setErrores([]);
            setError({
                nombre: '',
                descri: '',
                preUni: ''
            });
            await listarProductos();
        } if (data.type === 'validation') {
            setErrores(data.data);
        } if (data.type === 'required') {
            setError(data.data)
        } else {
            console.log(data);
        }
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        if (!idProducto) {
            insertarProducto();
        } else {
            actualizarProducto();
        }
    }

    useEffect(() => {
        listarCategorias();
    }, []);

    useEffect(() => {
        listarProductos();
    }, [filtroIdCategoria]);

    return (
        <>
            <p style={{ color: 'red' }}>
                {
                    errores.length > 0 && errores.map(error => <li key={error} >{error}</li>)
                }
            </p>
            <form onSubmit={handlerSubmit}>
                <label>Categorias</label>
                <select name="idCategoria" value={idCategoria} onChange={onInputChange}>
                    <option value="">No Seleccionado</option>
                    {
                        listaCategorias.map(cat => {
                            return <option key={cat.idCategoria} value={cat.idCategoria}>{cat.descri}</option>
                        })
                    }
                </select>
                <br />
                <label>Nombre</label>
                <input type="text" name='nombre' maxLength={20} value={nombre} onChange={onInputChange} />
                <br />
                {
                    error.nombre !== '' && <span style={{ color: 'red' }}>{error.nombre}</span>
                }
                {
                    typeof error.nombre == 'undefined' || error.nombre !== '' && <br />
                }

                <label>Descripcion</label>
                <input type="text" name='descri' maxLength={100} value={descri} onChange={onInputChange} />
                <br />
                {
                    error.descri !== '' && <span style={{ color: 'red' }}>{error.descri}</span>
                }
                {
                    typeof error.descri == 'undefined' || error.descri !== '' && <br />
                }

                <label>Precio Uni.</label>
                <input type="text" name='preUni' value={preUni} onChange={onInputChange} />
                <br />
                {
                    error.preUni !== '' && <span style={{ color: 'red' }}>{error.preUni}</span>
                }
                {
                    typeof error.preUni == 'undefined' || error.preUni !== '' && <br />
                }

                <button type='submit'>{idProducto === '' ? 'Registrar' : 'Modificar'}</button>
                {idProducto !== '' && <button type='button' onClick={() => {
                    onResetForm();
                }}>Cancelar</button>}
            </form>
            <h4>Lista de Producto (total de productos: {productos.length})</h4>

            <select onChange={(e) => setFiltroIdCategoria(e.target.value)}>
                <option value="-1">Todas las Opciones</option>
                {
                    listaCategorias.map(cat => {
                        return <option key={cat.idCategoria} value={cat.idCategoria}>{cat.descri}</option>
                    })
                }
            </select>

            <table border={1} style={{ marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Categoria</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Precio Uni.</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productos.map(pro => {
                            return <tr key={pro.idProducto}>
                                <td>{pro.idProducto}</td>
                                <td>{pro.categoria.descri}</td>
                                <td>{pro.nombre}</td>
                                <td>{pro.descri}</td>
                                <td>{pro.preUni}</td>
                                <td>
                                    <button onClick={() => obtenerProducto(pro.idProducto)}>Editar</button>
                                    <button onClick={() => eliminarProducto(pro.idProducto)}>Eliminar</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default ProductoPage