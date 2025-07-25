    const cargarPagina =  async (urlPagina) => {
        try {
            const responseList = await fetch(urlPagina)
            
            const pageInfo = await responseList.json();

            const pokemonsInfo = await Promise.all(
                pageInfo.results.map(
                    async (pokemon) => { // pokemon: { name: string, url: string (URL getById) }

                        const response = await fetch();

                        return datosDelPokemon;

                    }
                )
            );

            console.log(pokemonsInfo);

            return pageInfo;
        }catch(error){
            console.log(error)
        }
    }
    
    const lista = document.getElementById("lista");
    
    
    let infoPagina = cargarPagina("https://pokeapi.co/api/v2/pokemon?limit=10");

    //... más código
    infoPagina = cargarPagina(infoPagina.next);

    function crearTarjeta(pokemonInfo){
        const tarjeta = document.createElement("li");

        const imagen = document.createElement("img");
        imagen.src = pokemonInfo.imagen; //url de la imagen

        const titulo = document.createElement("h3");
        titulo.textContent = pokemonInfo.nombre;

        const id = document.createElement("p");
        id.textContent = pokemonInfo.id

        const baseExperiencia = document.createElement("p");
        baseExperiencia.textContent = pokemonInfo.baseExperiencia;

        const altura = document.createElement("p");
        altura.textContent = pokemonInfo.altura;

        tarjeta.append(imagen, titulo, id, baseExperiencia,altura);
        tarjeta.classList.add("card");

        return tarjeta;
    }

    lista.appendChild(crearTarjeta({
        imagen: "https://i.pinimg.com/736x/bf/95/34/bf953419d76bf747cba69b55e6e03957.jpg",
        nombre: "pikachu",
        id: "1",
        baseExperiencia: "60",
        altura: "100",
    }))