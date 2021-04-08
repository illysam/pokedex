export default class PokeApiClient {
  constructor(uri = 'https://pokeapi.co/api/v2/', limit = 12) {
    this.limit = limit
    this.uri = uri
  }

  async getPokemonsByPage(page = 1){
    const offset = (page - 1) * this.limit
    const uri = `${this.uri}pokemon?limit=${this.limit}&offset=${offset}`

    const response = await fetch(uri)
    if(response.status >= 200 && response.status < 300){
        return await response.json()
    }
    return {}
  }

}