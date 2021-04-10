<template>
    <div class="col-md-4">
        <div class="card mb-4 box-shadow" v-if="pokemon !== undefined">
          <img class="card-img-top" :src="pokemon?.sprites?.front_default" :alt="pokemon.name">
          <div class="card-body">
            <h5 class="card-title mb-4 text-uppercase text-center font-weight-bold">{{ pokemon.name }}</h5>
            <p class="card-text text-center mb-1">Abilities</p>
            <ul>
              <li v-for="ability in pokemon.abilities" :key="ability.slot" class="list-item text-left">{{ ability.ability.name }}</li>
            </ul>
            <div class="d-flex justify-content-between align-items-center">
                <router-link :to="{ name: 'pokemon', params: { name: pokemon.name }}" class="btn btn-sm btn-outline-secondary" :data-cy="`pokemon-${pokemon.name}`">Details</router-link>
                <small class="text-muted">{{ pokemon.name }}-{{ pokemon.id ?? undefined }}</small>
            </div>
          </div>
        </div>
        <div class="card mb-4 box-shadow d-flex justify-content-between align-items-center card-loading" v-else>
          <div class="spinner-grow text-secondary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    pokemon: {
      type: Object
    }
  }
}
</script>
