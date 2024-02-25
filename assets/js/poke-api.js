// Objeto que contém métodos para interagir com a PokeAPI
const pokeApi = {};

// Função para converter detalhes da PokeAPI em objetos Pokémon
function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon(); // Cria um novo objeto Pokémon
  pokemon.number = pokeDetail.id; // Define o número do Pokémon
  pokemon.name = pokeDetail.name; // Define o nome do Pokémon

  // Obtém os tipos do Pokémon
  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types; // Obtém o primeiro tipo

  pokemon.types = types; // Define os tipos do Pokémon
  pokemon.type = type; // Define o tipo principal do Pokémon

  // Obtém a URL da imagem do Pokémon
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon; // Retorna o objeto Pokémon convertido
}

// Método para obter detalhes de um Pokémon da PokeAPI
pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url) // Faz uma requisição GET para a URL do Pokémon
    .then((response) => response.json()) // Converte a resposta para JSON
    .then(convertPokeApiDetailToPokemon); // Converte os detalhes para um objeto Pokémon
};

// Método para obter uma lista de Pokémon da PokeAPI
pokeApi.getPokemons = (offset = 0, limit = 5) => {
  // Constrói a URL para obter os Pokémon com o deslocamento e limite especificados
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url) // Faz uma requisição GET para a URL construída
    .then((response) => response.json()) // Converte a resposta para JSON
    .then((jsonBody) => jsonBody.results) // Obtém a lista de resultados dos Pokémon
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // Mapeia cada Pokémon para obter seus detalhes
    .then((detailRequests) => Promise.all(detailRequests)) // Faz todas as solicitações de detalhes em paralelo
    .then((pokemonsDetails) => pokemonsDetails); // Retorna os detalhes dos Pokémon
};
