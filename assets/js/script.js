// funções globais
let nome_pokemon = document.getElementById('name');
let tipo_pokemon = document.getElementById('type');
let hp_pokemon = document.getElementById('hp');
let attack_pokemon = document.getElementById('attack');
let defense_pokemon = document.getElementById('defense');
let divDescription = document.querySelector('.description');
let imgElement = document.getElementById('img_pokemon');
let tittle = document.getElementById('tittle');
let add = document.querySelector('.add');

/* Função onde faz a requisição do pokémon */
async function buscar_pokemon() {

    /* Pega o que o usúario escreveu, valor do input, transforma em letra minúscula e tira os espaços. */
    let pokemon = document.getElementById('search').value.trim().toLowerCase();

    // se o usuario não digitar nada, por padrão ja escolhe o primeiro pokemon de ID: 1
    if(!pokemon){
        // Atribui o id: 1 a variavel pokemon
        pokemon = 1;
    }

    try {
        /* Faz a requisição com a url da api e coloca o pokémon escolhido pelo usúario
            dentro da url
        */
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        // Se não for encontrado retorna , essa mensagem.
        if(!response.ok){
            
            // adiciona a imagem do personagem e uma frase que o pokemon não foi encontrado!
            imgElement.src = 'assets/img/I_choose_you.png';
            tittle.textContent = "Pokémon não encontrado!"

            // Lipa o campo do imput e coloca o foco novamente nele para o usuario digitar novamente.
            document.getElementById('search').value = '';
            document.getElementById('search').focus();

            // remove a class show caso não encontre o pokémon
            divDescription.classList.remove('show');
            return;
        }

        // armazena na variavel data os dados do pokémon
        const data = await response.json();

        // seleciona apenas os dados que será usado na aplicação.
        showInfo({
            nome: data.name,
            tipo: data.types[0].type.name,
            id: data.id,
            hp: data.stats[0].base_stat,
            atk: data.stats[1].base_stat,
            def: data.stats[2].base_stat

        })

        // Lipa o campo do imput e coloca o foco novamente nele para o usuario digitar novamente.
        document.getElementById('search').value = '';
        document.getElementById('search').focus();

        console.log(data)

    } catch (erro){
        console.error("Erro:", erro);
        console.log("Falha ao conectar a api.");
    }
}


function showInfo(data){

    // adiciona a classe show para quando o usurio digita certo o pokemon
    divDescription.classList.add('show');

    // coloca no meu html dinamicamente os dados que escolhi para cada pokémon
    tittle.innerHTML = `${data.nome}`;
    imgElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
    
    nome_pokemon.innerHTML = `<strong>Nome:</strong> ${data.nome}`;
    tipo_pokemon.innerHTML = `<strong>Type:</strong> ${data.tipo}`;
    
    hp_pokemon.innerHTML = `<strong>HP:</strong> ${data.hp}`;
    attack_pokemon.innerHTML = `<strong>Attack:</strong> ${data.atk}`;
    defense_pokemon.innerHTML = `<strong>defense:</strong> ${data.def}`;

    // 
    add.classList.add('show');

}