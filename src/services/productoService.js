const BASE_API = 'http://localhost:11080/api/productos';

export const listarProductosAPI = async (idCategoria) => {
    const res = await fetch(BASE_API + '?idCategoria=' + idCategoria)
    return await res.json();
}

export const listarCategoriasAPI = async () => {
    const res = await fetch(BASE_API + '/categorias');
    return await res.json();
}

export const insertarProductoAPI = async (producto) => {
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
    })

    return await res.json();
}

export const actualizarProductoAPI = async (producto) => {
    const res = await fetch(BASE_API + '/' + producto.idProducto, {
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
    })

    return await res.json();
}

export const obtenerProductoAPI = async (id) => {
    const res = await fetch(BASE_API + '/' + id);
    return await res.json();
}

export const eliminarProductoAPI = async (id) => {
    const res = await fetch(BASE_API + '/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await res.json();
}