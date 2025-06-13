import { useEffect, useState } from "react";

const ClientePage = () => {

  const BASE_API = "http://localhost:11080/api/clientes";


  const [clientes, setClientes] = useState([]);

  const [cliente, setCliente] = useState({
    nombre: '',
    apellido: ''
  });

  const [clienteId, setClienteId] = useState(null);

  /*
  1.- variable donde se guarda el valor actual del estado.
  2.- función que se usa para cambiar el estado.
  3.- el tipo de dato que inicialaza el 'estado'
 */

  const manejadorInputs = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  }
  /*
1- e es el evento que contiene el input modificado.

2- e.target.name devuelve "nombre" o "apellido", según el input.

3- e.target.value devuelve lo que el usuario escribió.

4- { ...cliente } copia el estado actual del objeto cliente.

5- [e.target.name]: e.target.value actualiza solo el campo que cambió, manteniendo los demás.*/


  const listarClientes = async () => {/*Es una función asincrónica (async) porque va a trabajar con una operación que puede tardar: una llamada a una API.*/
    const res = await fetch(BASE_API);/* res contiene la respuesta cruda del servidor (no los datos aún)., await espera a que la respuesta llegue antes de continuar., hace una solicitud HTTP GET al backend*/
    const data = await res.json();/*data ahora es un array de objetos con los datos de los clientes, Convierte la respuesta a formato JSON*/
    setClientes(data);/*Usa el hook useState para actualizar el estado clientes con la información recibida*/
  }

  const insertarCliente = async () => {
    const res = await fetch(BASE_API, {/*Se le pasa un segundo argumento con la configuración del fetch*/
      method: 'POST',  /*method	  POST — indica que se quiere crear un nuevo recurso.*/
      headers: {
        'Content-Type': 'application/json' /* headers	  Content-Type: application/json — se envía en formato JSON.*/
      },
      body: JSON.stringify(cliente)/*body	    JSON.stringify(cliente) — convierte el objeto cliente a un texto JSON.*/
    });
    const data = await res.json(); /*Espera la respuesta del backend, Convierte esa respuesta a JSON.*/
    console.log(data);
  }

  const actualizarCliente = async () => {
    const res = await fetch(BASE_API + '/' + clienteId, {/*Esto construye la URL para actualizar un cliente específico*/
      method: 'PUT', /*method	'PUT' → indica que es una actualización.*/
      headers: {
        'Content-Type': 'application/json' /*headers	Se envía contenido tipo JSON.*/
      },
      body: JSON.stringify(cliente) /*body	Se mandan los nuevos datos del cliente, convertidos a texto JSON.*/
    });
    const data = await res.json();/*Espera la respuesta del servidor, La convierte a formato JSON.*/
    console.log(data);
  }

  const eliminarCliente = async (idCliente) => { /*Recibe como parámetro el ID del cliente que se desea eliminar.*/
    const res = await fetch(BASE_API + '/' + idCliente, {
      method: 'DELETE' /*Realiza una solicitud HTTP DELETE a la API.*/
    })
    const data = await res.json();/*Espera la respuesta del servidor, La convierte a formato JSON.*/
    if (data.type == 'success') { /*Verifica si el servidor respondió que la operación fue exitosa.*/
      setClientes(listaActual => listaActual.filter(clie => clie.idCliente !== idCliente))
      /*setClientes es la función para actualizar el estado clientes, creada con useState
       una función flecha que recibe el valor actual del estado clientes como listaActual.decir, listaActual contiene la lista completa de clientes antes de eliminar al cliente.
       La función .filter() recorre cada elemento de listaActual y devuelve un nuevo array con solo los elementos que cumplen cierta condición.
       Es la condición dentro del .filter(). clie es cada cliente de la lista. Compara si el idCliente del cliente es diferente (!==) al que se quiere eliminar.
      */
    }
  }

  const ejecutarForm = (e) => {
    e.preventDefault();/*Evita que el navegador recargue la página cuando se envía el formulario.*/
    if (!clienteId) {   /*Aquí se determina qué operación debe ejecutarse.  !clienteId → es decir, si NO hay un clienteId guardado*/
      insertarCliente(); /*Significa que estás creando un nuevo cliente.*/
    } else {               /*else → si sí hay un clienteId guardado*/
      actualizarCliente(); /*Significa que estás editando un cliente ya existente.*/
    }
    reiniciarFormulario(); /*Una vez que se termina de insertar o actualizar, se limpia el formulario para volver al estado inicial*/
  }

  const editarCliente = (cliente) => {
    setCliente(cliente); /*Esta línea copia todo el objeto del cliente que se pasó como argumento*/
    setClienteId(cliente.idCliente); /*Esto guarda el idCliente del cliente que se está editando en el estado clienteId*/
  }

  const reiniciarFormulario = () => {
    setCliente({ nombre: '', apellido: '' }); /*Esto reinicia el estado cliente con un objeto vacío*/
    setClienteId(null); /*Esto borra el identificador del cliente que se estaba editando:*/
  }

  useEffect(() => {
    listarClientes();
  }, [])
  /*useEffect es un hook de React que permite ejecutar código cuando el componente se monta, se actualiza o se desmonta.
    En este caso, está configurado para ejecutarse solo una vez, justo cuando el componente se monta (carga por primera vez en pantalla).
*/

  const cancelar = () => {
    reiniciarFormulario()
  }
  /*El evento onSubmit se activa cuando el usuario presiona el botón tipo submit o presiona Enter*/
  /*onChange={manejadorInputs}: cada vez que el usuario escribe algo, se llama a la función*/
  return <div>

    <form action="" onSubmit={ejecutarForm}>
      <label htmlFor="">Nombre</label>
      <input type="text" onChange={manejadorInputs} name="nombre" value={cliente.nombre} />
      <label htmlFor="">Apellido</label>
      <input type="text" onChange={manejadorInputs} name="apellido" value={cliente.apellido} />
      <button type="submit">{clienteId == null ? 'Registrar' : 'Editar'}</button>
      {
        clienteId != null && <button type="button" onClick={cancelar} >Cancelar</button>
      }

    </form>

    <hr />

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
          clientes.map(cliente => {
            return (
              <tr key={cliente.idCliente}>
                <td>{cliente.idCliente}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.apellido}</td>
                <td>
                  <button type="button" onClick={() => editarCliente(cliente)}>Editar</button>
                  <button onClick={() => eliminarCliente(cliente.idCliente)} type="button">Eliminar</button>
                </td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  </div>;
};

export default ClientePage;

