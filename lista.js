    const cargarPagina =  async (urlPagina) => {
        try {
            const responseList = await fetch(urlPagina)
            
            const pageInfo = await responseList.json();
            
            pageInfo.results = await Promise.all(
                pageInfo.results.map(
                    async (pokemon) => { // pokemon: { name: string, url: string (URL getById) }
                        const response = await fetch(pokemon.url);
                        const datosDelPokemon = await response.json();
                        console.log(datosDelPokemon)
                        
                        // Crear tarjeta 
                        const pokemonInfo = {
                            imagen: datosDelPokemon.sprites.front_default,
                            nombre: datosDelPokemon.name,
                            id: datosDelPokemon.id,
                            baseExperiencia: datosDelPokemon.base_experience,
                            altura: datosDelPokemon.height,
                        }

                        lista.append(crearTarjeta(pokemonInfo));
                        
                        
                        return datosDelPokemon;
                    }
                )
            );
            console.log(pageInfo);
            
            return pageInfo;
        }catch(error){
            console.log(error)
        }
    }

    cargarPagina("https://pokeapi.co/api/v2/pokemon?limit=10").then(actualizarPaginacion).catch(err => err/*Manejo de errores*/);

    function crearTarjeta(pokemonInfo){
        const tarjeta = document.createElement("li");

        const imagen = document.createElement("img");
        imagen.src = pokemonInfo.imagen; //url de la imagen

        const titulo = document.createElement("h3");
        titulo.textContent = pokemonInfo.nombre.toUpperCase();

        const id = document.createElement("p");
        id.textContent = "Id: " + pokemonInfo.id

        const baseExperiencia = document.createElement("p");
        baseExperiencia.textContent = "Experiencia Base: " + pokemonInfo.baseExperiencia;

        const altura = document.createElement("p");
        altura.textContent = "Altura: " + pokemonInfo.altura + "cm";

        tarjeta.append(imagen, titulo, id, baseExperiencia,altura);
        tarjeta.classList.add("card");

        return tarjeta;
    }

const btnAnterior = document.getElementById('anterior');
const btnSiguiente = document.getElementById('siguiente');

btnAnterior.addEventListener('click', () =>{
    lista.innerHTML = '';
    cargarPagina(infoPagina.previous).then(actualizarPaginacion);
})

btnSiguiente.addEventListener('click', () =>{
    lista.innerHTML = '';
    cargarPagina(infoPagina.next).then(actualizarPaginacion);
});

function actualizarPaginacion(infoPagina) {
 
    if (!infoPagina.previous) {
        btnAnterior.disabled = true;
    }

    if (!infoPagina.next) {
        btnSiguiente.disabled = true;  
    }
}


