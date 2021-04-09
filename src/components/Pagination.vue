<template>
  <nav aria-label="Pokemon page navigation">
    <ul class="pagination justify-content-center">
      <li :class="[hasPrevious ? '' : 'disabled', 'page-item']">
        <a class="page-link" :href="`/?offset=${offset(currentPage-1)}&limit=${limit}`" tabindex="-1">Previous</a>
      </li>
      <li :class="[this.currentPage === x ? 'active' : '', 'page-item']" v-for="x in range" :key="x">
        <a class="page-link" :href="`/?offset=${offset(x)}&limit=${limit}`">{{ x }}<span v-if="this.currentPage === x" class="sr-only">(current)</span></a>
      </li>
      <li :class="[hasNext ? '' : 'disabled', 'page-item']">
        <a class="page-link" :href="`/?offset=${offset(currentPage+1)}&limit=${limit}`">Next</a>
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
    hasNext: {
      type: Boolean,
      required: true,
    },
    hasPrevious: {
      type: Boolean,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
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
    },
  },
  methods: {
    offset(page){
      return (page - 1) * this.limit
    },
  },
}
</script>
