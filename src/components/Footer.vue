<template>
  <footer class="text-muted">
    <div class="container">
      <p class="float-right">
        <a href="#">Back to top</a>
      </p>
      <p>{{ text }}</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
}
</script>
