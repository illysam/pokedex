export default class PokeApiClient {

  async get(url){
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