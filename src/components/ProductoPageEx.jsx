/*import { useEffect, useState } from "react";

const ProductoPage = () => {

  const BASE_API = "http://localhost:11080/api/productos";

  const [productos, setProductos] = useState([]);

  const [listaCategorias, setListaCategorias] = useState([]);

  const [filtroIdCategoria, setFiltroIdCategoria] = useState(-1);

  const [producto, setProducto] = useState({
    idCategoria: null,
    nombre: '',
    descri: '',
    preUni: null
  });

  const [productoId, setProductoId] = useState(null);

  const manejadorInputs = (e) => setProducto({ ...producto, [e.target.name]: e.target.value });

  const listarCategorias = async () => {
    const res = await fetch(BASE_API + '/categorias');
    const data = await res.json();
    setListaCategorias(data);
  }

  const buscarPorId = async (id) => {
    const res = await fetch(BASE_API + '/' + id);
    const data = await res.json();
    setProducto({
      idCategoria: data.categoria.idCategoria,
      nombre: data.nombre,
      descri: data.descri,
      preUni: data.preUni
    });
    setProductoId(data.idProducto)
  }

  const listarProductos = async () => {
    const res = await fetch(BASE_API + '?idCategoria=' + filtroIdCategoria);
    const data = await res.json();
    setProductos(data);
  }

  const insertarProducto = async () => {
    const res = await fetch(BASE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        categoria: {
          idCategoria: producto.idCategoria
        },
        nombre: producto.nombre,
        descri: producto.descri,
        preUni: producto.preUni
      })
    });
    const data = await res.json();
    console.log(data);
    await listarProductos();
  }

  const actualizarProducto = async () => {
    const res = await fetch(BASE_API + '/' + productoId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        categoria: {
          idCategoria: producto.idCategoria
        },
        nombre: producto.nombre,
        descri: producto.descri,
        preUni: producto.preUni
      })
    });
    const data = await res.json();
    await listarProductos();
    console.log(data);
  }

  const eliminarProducto = async (idProducto) => {
    const res = await fetch(BASE_API + '/' + idProducto, {
      method: 'DELETE'
    })
    const data = await res.json();
    if (data.type == 'success') {
      setProductos(listaActual => listaActual.filter(clie => clie.idProducto !== idProducto))
    }
  }

  const ejecutarForm = (e) => {
    e.preventDefault();
    if (!productoId) {
      insertarProducto();
    } else {
      actualizarProducto();
    }
    reiniciarFormulario();
  }

  const reiniciarFormulario = () => {
    setProducto({ idCategoria: '', nombre: '', descri: '', preUni: '' });
    setProductoId(null);
  }

  useEffect(() => {
    listarCategorias();
  }, [])

  useEffect(() => {
    listarProductos();
  }, [filtroIdCategoria])

  return <div>

    <form action="" onSubmit={ejecutarForm}>

      <label>Categorias</label>
      <select value={producto.idCategoria} name="idCategoria"
        onChange={manejadorInputs}>
        <option value="">No Seleccionado</option>
        {
          listaCategorias.map(cat => (
            <option key={cat.idCategoria} value={cat.idCategoria}>{cat.descri}</option>
          ))
        }
      </select>
      <br />

      <label>Nombre</label>
      <input type="text" onChange={manejadorInputs} name="nombre" value={producto.nombre} />
      <br />

      <label>Descripcion</label>
      <input type="text" onChange={manejadorInputs} name="descri" value={producto.descri} />
      <br />

      <label>Precio Uni.</label>
      <input type="text" onChange={manejadorInputs} name="preUni" value={producto.preUni} />
      <br />

      <button type="submit">{productoId == null ? 'Registrar' : 'Editar'}</button>
      {
        productoId != null && <button type="button" onClick={reiniciarFormulario} >Cancelar</button>
      }

    </form>

    <hr />

    <h4>Lista de Producto</h4>

    <select onChange={(e) => setFiltroIdCategoria(e.target.value)}>
      <option value="-1">Todas las Opciones</option>
      {
        listaCategorias.map(cat => (
          <option key={cat.idCategoria} value={cat.idCategoria}>{cat.descri}</option>
        ))
      }
    </select>

    <table border={1} style={{ marginTop: '10px' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Categoria</th>
          <th>Nombre</th>
          <th>Descri</th>
          <th>Precio Uni.</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>
        {
          productos.map(producto => {
            return (
              <tr key={producto.idProducto}>
                <td>{producto.idProducto}</td>
                <td>{producto.categoria.descri}</td>
                <td>{producto.nombre}</td>
                <td>{producto.descri}</td>
                <td>{producto.preUni}</td>
                <td>
                  <button type="button" onClick={() => buscarPorId(producto.idProducto)}>Editar</button>
                  <button onClick={() => eliminarProducto(producto.idProducto)} type="button">Eliminar</button>
                </td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  </div>;
};

export default ProductoPage;*/
