<template>
  <nav aria-label="Pokemon page navigation">
    <ul class="pagination justify-content-center">
      <li :class="[hasPrevious ? '' : 'disabled', 'page-item']">
        <router-link class="page-link" :to="{name:'main', query: {page: currentPage-1}}">Previous</router-link>
      </li>
      <li :class="[this.currentPage === x ? 'active' : '', 'page-item']" v-for="x in range" :key="x">
        <router-link class="page-link" :to="{name:'main', query: {page: x}}">{{ x }}<span v-if="this.currentPage === x" class="sr-only">(current)</span></router-link>
      </li>
      <li :class="[hasNext ? '' : 'disabled', 'page-item']">
        <router-link class="page-link" :to="{name:'main', query: {page: currentPage+1}}">Next</router-link>
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
