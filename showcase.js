const TEMPO_EXIBICAO = 3000;
let intervalID = 0;
let iterator;

function onShowCaseClick() {
    if (!pokedex.size) return alert('Nenhum pokémon cadastrado!');
    const nomePokemon = document.getElementById('nomePokemon');
    const imagemPokemon = document.getElementById('imagemPokemon');

    if (intervalID) {
        window.clearInterval(intervalID);
        intervalID = 0;
        nomePokemon.classList.add('hidden');
        imagemPokemon.classList.add('hidden');
        nomePokemon.textContent = '';
        imagemPokemon.src = '';
    } else {
        nomePokemon.classList.remove('hidden');
        imagemPokemon.classList.remove('hidden');
        proximaImagemShowCase();
        intervalID = window.setInterval(proximaImagemShowCase, TEMPO_EXIBICAO);
    }
}

function proximaImagemShowCase() {
    const nomePokemon = document.getElementById('nomePokemon');
    const imagemPokemon = document.getElementById('imagemPokemon');
    const pokemon = getProximoPokemon();
    nomePokemon.textContent = pokemon.nome;
    imagemPokemon.src = pokemon.url;
}

function getProximoPokemon() {
    if (!iterator) iterator = pokedex.values();

    let proximo = iterator.next();
    if (proximo.done) {
        iterator = pokedex.values();
        proximo = iterator.next();
    }
    return proximo.value;
}

document.getElementById('showCase').addEventListener('click', onShowCaseClick);
