export default {
  pokemonsOnPage: (state) => state.pages.has(state.page) ? state.pages.get(state.page).results : []
}
