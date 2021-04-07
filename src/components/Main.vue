<template>
  <main role="main">
    <section class="jumbotron text-center">
      <div class="container">
        <p>
          <img class="image-fluid" alt="Pokémon logo" src="../assets/International_Pokémon_logo.svg" />
        </p>
        <h1 class="jumbotron-heading">{{ title }}</h1>
        <p class="lead text-muted">{{ text }}</p>
      </div>
    </section>

    <div class="album py-5 bg-light">
      <div class="container">

        <div class="row">
        <!-- this is where the cards go -->
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Main',
  props: {
    text: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    }
  },
  data() {
    return {

    }
  }
}
</script>
