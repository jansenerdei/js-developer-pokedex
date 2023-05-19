const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const exibirBtn = document.getElementById('btnExibir')
const card = document.getElementById('cardMain')

const maxRecords = 151
const limit = 10
let offset = 0;


function convertPokemonToLi(pokemon) {
    //console.log(pokemon)
    return `
        <a onclick="exibir(${pokemon.number})">
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
        </a>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
 
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function loadPokemonDetail(pokeId){
    /*pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemons.map(convertPokemonToLi).join('')
    })*/
    //debugger;
    
    const url2 = `https://pokeapi.co/api/v2/pokemon/${pokeId}`
    fetch(url2)
    .then((response) => response.json())
    .then((poke) => {
    console.log(poke);
    card.innerHTML = 
            `<article id="image" class="cardImage ${poke.types[0].type.name}">  
                <img src="${poke.sprites.other.dream_world.front_default}" alt="${poke.name}">
            </article>
    
            <article id="details">
                <div class="cardDetails">
                    <h3 class="${poke.types[0].type.name}">About</h3>
                    <div class="cardDetail">
                        <div class="labels">
                            <p>Species:</p>
                            <p>Height:</p>
                            <p>Weight:</p>
                            <p>Abilites:</p>
                        </div>
                        <div class="data">
                            <p>${poke.name}</p>
                            <p>${poke.height}<p>
                            <p>${poke.weight}</p>
                            <p>${poke.abilities[0].ability,name}</p>
                        </div>
                    </div>
                    <h3 class="${poke.types[0].type.name}">Breeding</h3>
                    <div class="cardDetail">
                        <div class="labels">
                            <p>Gender:</p>
                            <p>Egg Groups:</p>
                            <p>Egg Cycle:</p>
                        </div>
                        <div class="data">
                            <p>${poke.forms[0].name}</p>
                            <p>${poke.id}</p>
                            <p>${poke.types[0].type.name}</p>
                        </div>
                    </div>
                </div>
            </article>
            <button id="btnBack" class="btnBack ${poke.types[0].type.name}" onclick="esconder()">Close</button>`
        })
}

function exibir (pokeId) {
    card.style.display = "flex";
    loadPokemonDetail(pokeId);    
}

function esconder () {
    card.style.display = "none";
}

//console.log(pokemons[0].name);
//console.log(pokeApi.getPokemons());
//console.log(pokeApi.getPokemonCardDetail());


