import Global from './../Global';
import fetch from 'node-fetch';

export default class ServiceCoches {

    // Obtener coches
    getCoches() {
        let coches = [];
        let request = "api/coches";
        let url = Global.urlApiCoches + request;

        return new Promise((resolve, reject) => {
            // Usamos fetch directamente, que devuelve una promesa
            fetch(url)
                .then(response => {
                    // Comprobamos si la respuesta es exitosa
                    if (!response.ok) {
                        reject(`Error al obtener los coches: ${response.statusText}`);
                    }
                    // Si la respuesta es exitosa, convertimos a JSON
                    return response.json();
                })
                .then(data => {
                    coches = data;  // Asignamos los coches a la variable
                    console.log("Leyendo coches");
                    resolve(coches);  // Resolvemos la promesa con los coches
                })
                .catch(error => {
                    // Capturamos cualquier error
                    console.error('Error al obtener coches:', error);
                    reject(error);  // Rechazamos la promesa si hay un error
                });
        });
    }

    // Buscar coche por id
    findCoche(idCoche) {
        let coche = {};
        let request = "api/Coches/FindCoche/" + idCoche;
        let url = Global.urlApiCoches + request;

        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        reject(`Error al obtener el coche: ${response.statusText}`);
                    }
                    return response.json(); // Convertimos la respuesta a JSON
                })
                .then(data => {
                    coche = data;  // Asignamos el coche obtenido
                    resolve(coche);  // Resolvemos la promesa con el coche
                })
                .catch(error => {
                    console.error('Error al obtener el coche:', error);
                    reject(error);  // Rechazamos si hay algún error
                });
        });
    }

    // Insertar nuevo coche
    insertCoche(coche) {
        let request = "api/Coches/InsertCoche";
        let url = Global.urlApiCoches + request;

        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',  // Usamos POST para crear un nuevo coche
                headers: {
                    'Content-Type': 'application/json',  // Indicamos que el contenido es JSON
                },
                body: JSON.stringify(coche),  // Enviamos el coche como JSON
            })
                .then(response => {
                    if (!response.ok) {
                        reject(`Error al crear el coche: ${response.statusText}`);
                    }
                    return response.json();  // Convertimos la respuesta a JSON
                })
                .then(data => {
                    resolve(data);  // Resolvemos con el coche creado
                })
                .catch(error => {
                    console.error('Error al crear el coche:', error);
                    reject(error);  // Rechazamos si hay error
                });
        });
    }

    // Actualizar coche
    updateCoche(coche) {
        let request = "api/Coches/UpdateCoche";
        let url = Global.urlApiCoches + request;

        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'PUT',  // Usamos PUT para actualizar un coche
                headers: {
                    'Content-Type': 'application/json',  // Indicamos que el contenido es JSON
                },
                body: JSON.stringify(coche),  // Enviamos el coche como JSON
            })
                .then(response => {
                    if (!response.ok) {
                        // Si la respuesta no es exitosa, rechazamos con un mensaje de error
                        reject(`Error al actualizar el coche: ${response.statusText}`);
                    }
                    // Si la respuesta tiene contenido, lo parseamos a JSON
                    return response.text();  // Primero obtenemos el cuerpo como texto
                })
                .then(data => {
                    // Si la respuesta es vacía, devolvemos una respuesta de éxito
                    if (!data) {
                        resolve('Coche actualizado con éxito.');
                    } else {
                        // Si tiene contenido, intentamos parsearlo como JSON
                        try {
                            const parsedData = JSON.parse(data);
                            resolve(parsedData);  // Resolvemos con los datos parseados
                        } catch (error) {
                            reject('Error al parsear la respuesta JSON');
                        }
                    }
                })
                .catch(error => {
                    console.error('Error al actualizar el coche:', error);
                    reject(error);  // Rechazamos si hay error
                });
        });
    }

    // Eliminar coche por ID
    deleteCoche(idCoche) {
        let request = "api/Coches/DeleteCoche/" + idCoche;
        let url = Global.urlApiCoches + request;

        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'DELETE',  // Usamos DELETE para eliminar un coche
                headers: {
                    'Content-Type': 'application/json',  // Indicamos que el contenido es JSON
                },
            })
                .then(data => {
                    resolve(data);  // Resolvemos con los datos de la respuesta
                })
                .catch(error => {
                    console.error('Error al eliminar el coche:', error);
                    reject(error);  // Rechazamos si hay error
                });
        });
    }
}