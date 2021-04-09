export default class PokeApiClient {
  constructor(url = 'https://pokeapi.co/api/v2/', limit = 12) {
    this.limit = limit
    this.url = url
  }

  async getPokemonsByPage(page = 1){
    const offset = (page - 1) * this.limit
    const url = `${this.url}pokemon?limit=${this.limit}&offset=${offset}`

    const response = await fetch(url)
    if(response.status >= 200 && response.status < 300){
        return await response.json()
    }
    return {}
  }

  async getPokemonByUrl(url){
    if(!url) {
      return {}
    }

    const response = await fetch(url)
    if(response.status >= 200 && response.status < 300){
        return await response.json()
    }
    return {}
  }

}