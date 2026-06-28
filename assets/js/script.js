

// funções globais - tags html
let nome_pokemon = document.getElementById('name');
let tipo_pokemon = document.getElementById('type');
let hp_pokemon = document.getElementById('hp');
let attack_pokemon = document.getElementById('attack');
let defense_pokemon = document.getElementById('defense');
let divDescription = document.querySelector('.description');
let imgElement = document.getElementById('img_pokemon');
let tittle = document.getElementById('tittle');
let add = document.querySelector('.add');

// funçoes globais para pegar dados dos pokémons
let nome;
let hp;
let attack;
let img;
let defense;
let id;

// Função onde faz a requisição do pokémon
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
            imgElement.src = 'assets/img/i_choose_you.png';
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

        // Atribui os valores com os dados dos pokémons para eu usar em minhas variaveis globais
        nome = data.name;
        hp = data.stats[0].base_stat;
        attack = data.stats[1].base_stat;
        defense = data.stats[2].base_stat;
        id = data.id;

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

// função para adicionar as informações na pagina
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

    // adiciona a classe show ao botao para adicionar a equipe
    add.classList.add('show');

}


// funções da pagina Team.css
// -------------------------------------------------------------------------

// variavel para pegar o botao la do html , para conseguirmos usar aqui no js dinamicamente
const btn_add_pokemon = document.getElementById('btn_add_pokemon');

// puxa dentro da lista os pokémons , se tiver dados no local storage ele puxa os dados ja existentes se nao ele puxa a lista vazia , pois nao tinha sido adiconado nenhum pokémon antes.
let lista_equipe = JSON.parse(localStorage.getItem('api_dados')) || [];


// funçao para quando o usuario clicar no botao para adicionar a equipe
// executa tudo que esta dentro
btn_add_pokemon.addEventListener('click', () => {

    // joga para dentro da variavel existe_pokemon o valor boleano de true ou flase se existe ou nao dentro da equipe o pokemon que o usuario quer adicionar .
    const existe_pokemon = lista_equipe.some(pokemon => pokemon.nomePokemon == nome);

    // verificaçao se existir o pokemon na equipe , faz as alteraçoes
    if(existe_pokemon){
        tittle.textContent = 'Pokémon já adicionado.';
        imgElement.src = 'assets/img/i_choose_you.png';
        // remove a class show caso não encontre o pokémon
        divDescription.classList.remove('show');
        add.classList.remove('show');
        return;
    }
    
    // verificaçao se a equipe ja tem 6 pokémons , se tiver faz as alteraçoes
    if( lista_equipe.length >= 6 ){
        tittle.textContent = 'Equipe completa';
        imgElement.src = 'assets/img/i_choose_you.png';
        // remove a class show caso não encontre o pokémon
        divDescription.classList.remove('show');
        add.classList.remove('show');
        return;

    }

    // se passar nas duas verificaçoes é adicionado o pokemona equipe , dentro de um dicionário com suas informaçoes.
    lista_equipe.push({
        nomePokemon : `${nome}`,
        hpPokemon : `${hp}`,
        ataquePokemon : `${attack}`,
        defesaPokemon : `${defense}`,
        img : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    })
            
   
    // coloca no local storage os dados de cada pokémon.
    localStorage.setItem('api_dados', JSON.stringify(lista_equipe));
    
});
  


