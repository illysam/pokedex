<template>
  <nav aria-label="Pokemon page navigation">
    <ul class="pagination justify-content-center">
      <li :class="[!!previous ? '' : 'disabled', 'page-item']">
        <a class="page-link" href="#" tabindex="-1">Previous</a>
      </li>
      <li :class="[this.currentPage === x ? 'active' : '', 'page-item']" v-for="x in range" :key="x">
        <a class="page-link" href="#">{{ x }}<span v-if="this.currentPage === x" class="sr-only">(current)</span></a>
      </li>
      <li :class="[!!next ? '' : 'disabled', 'page-item']">
        <a class="page-link" href="#">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
const rangeMargin = 1;

export default {
  name: 'Pagination',

  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    next: {
      type: String,
    },
    previous: {
      type: String,
    },
    totalNumberOfPages: {
      type: Number,
      required: true,
    },
  },
  computed: {
    range(){
      return Array.from({ length: 3 }, (_, i) => this.start + i);
    },
    start(){
      if(this.currentPage === rangeMargin || this.currentPage <= 0){
        return 1
      }
      if(this.currentPage === this.totalNumberOfPages - rangeMargin ||
      this.currentPage >= this.totalNumberOfPages){
        return this.totalNumberOfPages - rangeMargin
      }
      return this.currentPage - rangeMargin
    }
  }
}
</script>
