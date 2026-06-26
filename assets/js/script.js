
async function buscar_pokemon() {
    const pokemon = document.getElementById('search').value.toLowerCase();

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        if(!response.ok){
            console.log('POkemon nao encontrado, tente novamente.');
        }

        const data = await response.json();

        showInfo({
            nome: data.name,
            tipo: data.types[0].type.name,
            id: data.id

        })

        console.log(data)

    } catch (erro) {
        console.error('Erro', erro)
    }
}


function showInfo(data){

    const imgElement = document.getElementById('img_pokemon');

    document.getElementById('name').innerHTML = `Nome: ${data.nome}`;
    document.getElementById('type').innerHTML = `Type: ${data.tipo}`;
    imgElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${data.id}.png`;
}