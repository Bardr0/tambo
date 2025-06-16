const BASE_API = "http://localhost:11080/api/categorias";

export const eliminarCategoriaApi = async (id) => {
    const res = await fetch(BASE_API + '/' + id, {
        method: 'DELETE'
    })
    return await res.json();
}

export const listarCategoriaApi = async () => {
    const res = await fetch(BASE_API);
    return await res.json();
}