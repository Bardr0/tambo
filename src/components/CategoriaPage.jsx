import { useEffect, useState } from "react";
import CategoriaTable from "./CategoriaTable";
import CategoriaForm from "./CategoriaForm";

const CategoriaPage = () => {

    const BASE_API = "http://localhost:11080/api/categorias";

    /*
      1.- nombre del 'estado'
      2.- nombre del 'estado' cambiente (set)
      3.- el tipo de dato que inicialaza el 'estado'
     */
    const [categorias, setCategorias] = useState([]);

    const [categoria, setCategoria] = useState({
        sigla: '',
        descri: ''
    });

    const [categoriaId, setCategoriaId] = useState(null);


    const listarCategorias = async () => {
        const res = await fetch(BASE_API);
        const data = await res.json();
        setCategorias(data);
    }


    useEffect(() => {
        listarCategorias();
    }, [])



    return <div>

        <CategoriaForm listarCategorias={listarCategorias}
            setCategoriaId={setCategoriaId}
            categoriaId={categoriaId}
            categoria={categoria}
            setCategoria={setCategoria} />

        <hr />

        <CategoriaTable
            setCategoriaId={setCategoriaId}
            setCategorias={setCategorias}
            setCategoria={setCategoria}
            listarCategorias={listarCategorias}
            categorias={categorias}
        />
    </div>;
};

export default CategoriaPage;
