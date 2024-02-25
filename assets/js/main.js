// Seleciona elementos HTML importantes
const pokemonList = document.getElementById("pokemonList"); // Lista de Pokémon
const loadMoreButton = document.getElementById("loadMoreButton"); // Botão "Carregar Mais"

// Definição de constantes e variáveis
const maxRecords = 151; // Número máximo de registros de Pokémon
const limit = 10; // Quantidade de Pokémon a carregar de cada vez
let offset = 0; // Deslocamento inicial na lista de Pokémon

// Função para converter Pokémon em elementos de lista
function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span> // Número do Pokémon
            <span class="name">${pokemon.name}</span> // Nome do Pokémon

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")} // Tipos do Pokémon
                </ol>

                <img src="${pokemon.photo}" // Imagem do Pokémon
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

// Função para carregar itens de Pokémon
function loadPokemonItens(offset, limit) {
  // Obtém uma lista de Pokémon da API
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    // Converte os Pokémon em elementos de lista e os adiciona ao HTML da lista de Pokémon
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

// Carrega os primeiros Pokémon quando a página é carregada
loadPokemonItens(offset, limit);

// Adiciona um ouvinte de evento para o clique no botão "Carregar Mais"
loadMoreButton.addEventListener("click", () => {
  offset += limit; // Atualiza o deslocamento para indicar o próximo conjunto de Pokémon a serem carregados
  const qtdRecordsWithNextPage = offset + limit; // Calcula o número total de registros com a próxima página

  if (qtdRecordsWithNextPage >= maxRecords) {
    // Verifica se excede ou é igual ao máximo de registros
    const newLimit = maxRecords - offset; // Ajusta o limite para carregar apenas os últimos Pokémon restantes
    loadPokemonItens(offset, newLimit); // Carrega os últimos Pokémon restantes

    loadMoreButton.parentElement.removeChild(loadMoreButton); // Remove o botão "Carregar Mais"
  } else {
    loadPokemonItens(offset, limit); // Carrega o número padrão de Pokémon definido em 'limit'
  }
});
