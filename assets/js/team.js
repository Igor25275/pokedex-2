const dados_salvos = localStorage.getItem('api_dados');

console.log(JSON.parse(dados_salvos));

const dados_convertido = JSON.parse(dados_salvos);


const div_pokebola = document.getElementById('pokebola');

for (const pokemon of dados_convertido) {
    
    const div = document.createElement('div');
    div.classList.add('pokemon_name_img');

    const h3 = document.createElement('h3');
    h3.textContent = pokemon.nomePokemon;

    const img = document.createElement('img');
    img.src = pokemon.img;
    img.alt = pokemon.nomePokemon;

    const p_hp = document.createElement('p');
    p_hp.textContent = `HP: ${pokemon.hpPokemon}`;

    const p_attack = document.createElement('p');
    p_attack.textContent = `Ataque: ${pokemon.ataquePokemon}`;

    const p_defense = document.createElement('p');
    p_defense .textContent = `HP: ${pokemon.defesaPokemon}`;

    const btn_remove = document.createElement('button');
    btn_remove.classList.add('btn_add');

    const icon = document.createElement('i');
    icon.classList.add('fa-regular', 'fa-trash-can');
    btn_remove.append(icon)

    btn_remove.addEventListener('click', () => {
        alert('Excluir pokemon.');
    })

    div.append(h3, img, p_hp, p_attack, p_defense, btn_remove);

    div_pokebola.append(div);
}