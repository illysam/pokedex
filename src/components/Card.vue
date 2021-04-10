<template>
    <div class="col-md-4">
        <div class="card mb-4 box-shadow" v-if="pokemon !== undefined">
          <img class="card-img-top" :src="pokemon?.sprites?.front_default" :alt="pokemon.name">
          <div class="card-body">
            <h5 class="card-title">{{ pokemon.name }}</h5>
            <p class="card-text">Abilities</p>
            <ul>
              <li v-for="ability in pokemon.abilities" :key="ability.slot" class="list-item">{{ ability.ability.name }}</li>
            </ul>
            <div class="d-flex justify-content-between align-items-center">
                <a :href="`/pokemon/${pokemon.name}/`" class="btn btn-sm btn-outline-secondary">Details</a>
                <small class="text-muted">{{ pokemon.name }}-{{ pokemon.id ?? undefined }}</small>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    pokemon: {
      type: Object,
    },
  },
}
</script>