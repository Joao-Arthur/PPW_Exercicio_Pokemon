const pokedex = new Map(
    Object.entries({
        1: {
            numero: 1,
            nome: 'Bulbassauro',
            tipo: [Tipo.GRAMA, Tipo.VENENOSO],
            descricao: 'É um dos três Pokémon iniciais da região de Kanto. ',
            url:
                'https://static.wikia.nocookie.net/pokepediabr/images/2/21/001Bulbasaur.png/revision/latest?cb=20161211150608&path-prefix=pt-br'
        },
        4: {
            numero: 4,
            nome: 'Charmander',
            tipo: [Tipo.FOGO],
            descricao: 'É um dos três Pokémon iniciais da região de Kanto.',
            url:
                'https://static.wikia.nocookie.net/pokepediabr/images/7/73/004Charmander.png/revision/latest?cb=20161215011226&path-prefix=pt-br'
        },
        7: {
            numero: 7,
            nome: 'Squirtle',
            tipo: [Tipo.AGUA],
            descricao: 'É um dos três Pokémon iniciais da região de Kanto. ',
            url:
                'https://static.wikia.nocookie.net/pokepediabr/images/3/39/007Squirtle.png/revision/latest?cb=20161215011229&path-prefix=pt-br'
        },
        10: {
            numero: 10,
            nome: 'Caterpie',
            tipo: [Tipo.INSETO],
            descricao:
                'Se assemelha a uma lagarta verde com uma parte inferior amarela e cauda em forma de lágrima.',
            url:
                'https://static.wikia.nocookie.net/pokepediabr/images/5/5d/010Caterpie.png/revision/latest?cb=20161215011231&path-prefix=pt-br'
        },
        13: {
            numero: 13,
            nome: 'Weedle',
            tipo: [Tipo.INSETO, Tipo.VENENOSO],
            descricao:
                'Possui um corpo segmentado que varia na cor do amarelo ao marrom-avermelhado.',
            url:
                'https://static.wikia.nocookie.net/pokepediabr/images/d/df/013Weedle.png/revision/latest?cb=20161215011233&path-prefix=pt-br'
        },
        16: {
            numero: 16,
            nome: 'Pidgey',
            tipo: [Tipo.NORMAL, Tipo.VOADOR],
            descricao: 'É uma ave pequena e rechonchuda.',
            url:
                'https://static.wikia.nocookie.net/pokepediabr/images/5/55/016Pidgey.png/revision/latest?cb=20161215011234&path-prefix=pt-br'
        },
        39: {
            numero: 39,
            nome: 'Jigglypuff',
            tipo: [Tipo.NORMAL, Tipo.FADA],
            descricao: 'É rosa com um corpo esférico.',
            url:
                'https://static.wikia.nocookie.net/pokepediabr/images/3/3e/039Jigglypuff.png/revision/latest?cb=20161215012231&path-prefix=pt-br'
        },
        41: {
            numero: 41,
            nome: 'Zubat',
            tipo: [Tipo.VENENOSO, Tipo.VOADOR],
            descricao: 'É um Pokémon azul parecido com um morcego.',
            url:
                'https://static.wikia.nocookie.net/pokepediabr/images/d/da/041Zubat.png/revision/latest?cb=20161215012232&path-prefix=pt-br'
        },
        52: {
            numero: 52,
            nome: 'Miau',
            tipo: [Tipo.NORMAL],
            descricao:
                'É um felino com pelo de cor creme que fica marrom nas pontas das patas traseiras e cauda.',
            url:
                'https://static.wikia.nocookie.net/pokepediabr/images/d/d6/052Meowth.png/revision/latest?cb=20161215012626&path-prefix=pt-br'
        },
        54: {
            numero: 54,
            nome: 'Psyduck',
            tipo: [Tipo.AGUA],
            descricao:
                'Se assemelha a um pato amarelo ou ornitorrinco com um olhar vago',
            url:
                'https://static.wikia.nocookie.net/pokepediabr/images/5/53/054Psyduck.png/revision/latest?cb=20161215012627&path-prefix=pt-br'
        }
    })
);

function removePokemonDOM(numero) {
    document
        .getElementById('containerListaPokemons')
        .removeChild(document.getElementById(numero));
}

function adicionar(pokemon) {
    if (!pokemon) throw new Error('Nenhum pokémon informado para adicionar!');
    if (pokedex.has(String(pokemon.numero)))
        throw new Error('Número do pokémon já informado!');
    pokedex.set(String(pokemon.numero), pokemon);

    adicionarPokemonDOM(pokemon);
}

function editar(numero) {
    if (!pokedex.has(String(numero)))
        return alert(`Pokémon ${numero} não encontrado na pokédex!`);
    const pokemon = pokedex.get(String(numero));
    limpaCampos();
    document.getElementById('numero').value = pokemon.numero;
    document.getElementById('nome').value = pokemon.nome;
    document.getElementById('descricao').value = pokemon.descricao;
    document.getElementById('url').value = pokemon.url;
    Array.from(document.getElementById('tipo').children).forEach(option => {
        if (pokemon.tipo.includes(option.value)) {
            option.setAttribute('selected', '');
        } else option.removeAttribute('selected');
    });
    document.getElementById('submitPokemon').textContent = 'editar pokémon';

    document
        .getElementById('formPokemon')
        .removeEventListener('submit', submitFormPokemon);

    document
        .getElementById('formPokemon')
        .addEventListener('submit', salvarEdicao);
}

function salvarEdicao(e) {
    e.preventDefault();

    const numero = Number(getValorCampo('numero'));
    const nome = getValorCampo('nome');
    const descricao = getValorCampo('descricao');
    const url = getValorCampo('url');
    const tipo = getValorSelect('tipo');

    const pokemon = new PokemonBuilder()
        .setNumero(numero)
        .setNome(nome)
        .setDescricao(descricao)
        .seturl(url)
        .setTipo(tipo)
        .build();

    remover(numero);
    adicionar(pokemon);
    limpaCampos();
    document.getElementById('submitPokemon').textContent = 'adicionar pokémon';
    Array.from(document.getElementById('tipo').children).forEach(option =>
        option.removeAttribute('selected')
    );

    document
        .getElementById('formPokemon')
        .removeEventListener('submit', salvarEdicao);

    document
        .getElementById('formPokemon')
        .addEventListener('submit', submitFormPokemon);
}

function remover(numero) {
    if (!pokedex.has(String(numero)))
        return alert(`Pokémon ${numero} não encontrado na pokédex!`);
    pokedex.delete(String(numero));
    removePokemonDOM(numero);
}

function pokemonToDOM({ nome, numero }) {
    const container = createDOMElement('div', { id: numero });
    const pokemon = createDOMElement('span', { textContent: nome });
    const editarButton = createDOMElement('button', {
        textContent: 'editar',
        onclick: () => editar(numero)
    });
    const removerButton = createDOMElement('button', {
        textContent: 'remover',
        onclick: () => remover(numero)
    });
    return appendElements(container, [pokemon, editarButton, removerButton]);
}

function adicionarPokemonDOM(pokemon) {
    document
        .getElementById('containerListaPokemons')
        .appendChild(pokemonToDOM(pokemon));
}

function onLoad() {
    pokedex.forEach(adicionarPokemonDOM);
}

window.addEventListener('load', onLoad);
