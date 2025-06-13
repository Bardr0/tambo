import React from 'react'

const CategoriaForm = ({ listarCategorias, setCategoriaId, categoriaId, categoria, setCategoria }) => {

    const BASE_API = "http://localhost:11080/api/categorias";

    const manejadorInputs = (e) => {
        setCategoria({ ...categoria, [e.target.name]: e.target.value });
    }

    const insertarCategoria = async () => {
        console.log(categoria);

        const res = await fetch(BASE_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoria)
        });
        const data = await res.json();
        console.log(data);
        if (data.type === 'success') {
            listarCategorias();
        }
    }

    const actualizarCategoria = async () => {
        const res = await fetch(BASE_API + '/' + categoriaId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoria)
        });
        const data = await res.json();
        console.log(data);
        if (data.type === 'success') {
            listarCategorias();
        }
    }

    const ejecutarForm = (e) => {
        e.preventDefault();
        if (!categoriaId) {
            insertarCategoria();
        } else {
            actualizarCategoria();
        }
        reiniciarFormulario();
    }



    const reiniciarFormulario = () => {
        setCategoria({ nombre: '', apellido: '' });
        setCategoriaId(null);
        console.log(categoria);
        
    }

    const cancelar = () => {
        reiniciarFormulario()
    }

    return (
        <form action="" onSubmit={ejecutarForm}>
            <label htmlFor="">Nombre</label>
            <input type="text" onChange={manejadorInputs} name="sigla" value={categoria.sigla} />
            <label htmlFor="">Apellido</label>
            <input type="text" onChange={manejadorInputs} name="descri" value={categoria.descri} />
            <button type="submit">{categoriaId == null ? 'Registrar' : 'Editar'}</button>
            {
                categoriaId != null && <button type="button" onClick={cancelar} >Cancelar</button>
            }

        </form>
    )
}

export default CategoriaForm