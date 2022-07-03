import uri from './uri';

const URI = uri();

//Devuelve un json con todas las enfermedades
export const getEnfermedades = async () =>{
    //Realiza la petición
    const res = await fetch(URI+'enfermedades');
    
    //Recibe los datos mandados por la API
    const data = await res.json();
    
    //Se imprime en consola
    console.log(data);

    //Se retorna
    return data;

};

//Devuelve una enfermedad
export const getEnfermedad = async (id) =>{
    const res = await fetch(`${URI}enfermedades/${id}`);
    return await res.json();
};

//Guarda una Enfermedad
export const saveVaca = async (newEnfermedad) =>{
    const res = await fetch(URI+'enfermedades/create', 
    {
        method:'POST', 
        headers:{Accept: 'application/json', 'Content-Type':'application/json'},
        body: JSON.stringify(newEnfermedad)
    });

    return await res.json();
};

//Elimina una Enfermedad
export const deleteEnfermedad = async (id) =>{
    await fetch(`${URI}enfermedades/${id}`,{
        method: 'DELETE',
    });
};

//Actuliza una Enfermedad
export const updateEnfermedad = async (id, newEnfermedad) =>{
    const res = await fetch(`${URI}enfermedades/${id}`,{
        method: 'PUT',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(newEnfermedad)
    });
    return res;
};