const nock = require("nock");
const PokeAPI = require("./pokeApi");
const { POKEAPI_URL } = process.env;

describe("PokeAPi", () => {
  const pokeAPI = new PokeAPI();
  pokeAPI.initialize({
    context: {},
  });

  beforeEach(() => {
    nock.cleanAll();
  });
  test("Should return a pokemon list", async () => {
    const expectedResult = expect.arrayContaining([
      expect.objectContaining({
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon/1/",
      }),
    ]);

    nock(POKEAPI_URL)
      .get("/pokemon/?offset=0&limit=20")
      .reply(200, {
        count: 1118,
        next: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20",
        previous: null,
        results: [
          {
            name: "bulbasaur",
            url: "https://pokeapi.co/api/v2/pokemon/1/",
          },
          {
            name: "ivysaur",
            url: "https://pokeapi.co/api/v2/pokemon/2/",
          },
        ],
      });

    const response = await pokeAPI.getPokemonList();
    expect(response.results).toEqual(expectedResult);
  });

  test("Should return pokemon type", async () => {
    const mockId = 1;
    const expectedResult = expect.arrayContaining([
      expect.objectContaining({
        slot: 2,
        type: {
          name: "poison",
          url: "https://pokeapi.co/api/v2/type/4/",
        },
      }),
    ]);

    nock(POKEAPI_URL)
      .get(`/pokemon/${mockId}`)
      .reply(200, {
        id: 1,
        name: "bulbasaur",
        species: {
          name: "bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon-species/1/",
        },
        types: [
          {
            slot: 1,
            type: {
              name: "grass",
              url: "https://pokeapi.co/api/v2/type/12/",
            },
          },
          {
            slot: 2,
            type: {
              name: "poison",
              url: "https://pokeapi.co/api/v2/type/4/",
            },
          },
        ],
      });

    const response = await pokeAPI.getPokemonType(mockId);
    expect(response.types).toEqual(expectedResult);
  });
});
