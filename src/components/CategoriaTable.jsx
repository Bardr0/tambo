const CategoriaTable = ({ setCategoriaId, categorias, setCategorias, setCategoria, listarCategorias }) => {


    const BASE_API = "http://localhost:11080/api/categorias";

    const eliminarCategoria = async (idCategoria) => {
        const res = await fetch(BASE_API + '/' + idCategoria, {
            method: 'DELETE'
        })
        const data = await res.json();
        if (data.type == 'success') {
            setCategorias(listaActual => listaActual.filter(clie => clie.idCategoria !== idCategoria))
            listarCategorias();
        }
    }

    const editarCategoria = (categoria) => {
        setCategoria(categoria);
        setCategoriaId(categoria.idCategoria);
    }

    return (
        <table border={1}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                {
                    categorias.map(categoria => {
                        return (
                            <tr key={categoria.idCategoria}>
                                <td>{categoria.idCategoria}</td>
                                <td>{categoria.sigla}</td>
                                <td>{categoria.descri}</td>
                                <td>
                                    <button type="button" onClick={() => editarCategoria(categoria)}>Editar</button>
                                    <button onClick={() => eliminarCategoria(categoria.idCategoria)} type="button">Eliminar</button>
                                </td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    )
}

export default CategoriaTable