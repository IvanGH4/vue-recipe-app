<template>
  <div class="home">
    <h1>Search your favourite meals and their recipes!</h1>

    <div class="form-wrapper flex-center my-20" @submit.prevent="getMeals">
      <form class="flex-center w-md">
        <input class="py-15 px-20 w-full search" type="text" placeholder="Search for a meal" v-model="meal" />
        <input class="py-15 px-20 bg-blue text-light btn" type="submit" value="Search">
      </form>
    </div>

    <Loader v-if="isLoading" />

    <div class="cards-wrapper" v-for="(item, idx) in mealsList" :key="idx">
      <div class="card mx-5 my-10 py-10 px-15 rounded-sm w-sm" v-for="(ob, idx) in item" :key="idx">
        <div class="card-head">
          <h3>
            {{ob.strMeal}}
          </h3>
          <img class="rounded-full" :src="ob.strMealThumb" alt="#" />
        </div>
        <small class="text-secondary">
          {{ob.strCategory}}
        </small>
        <hr />
        <div class="my-10 btns-box">
          <a class="text-light" :href="ob.strYoutube" target="_blank">
            How to make it?
          </a>
          <button class="px-10 py-5 rounded-sm bg-light" @click="showSingleMeal(ob.idMeal)">Read more</button>
        </div>
      </div>
    </div>

    <template v-if="clicked">
      <SingleMeal :id="singleMealId" />
    </template>
  </div>
</template>

<script>
// @ is an alias to /src
import SingleMeal from '@/components/share-tools/SingleMeal';
import Loader from '@/components/share-tools/Loader';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    SingleMeal,
    Loader
  },
  data() {
    return {
      meal: '',
      mealsList: [],
      isLoading: false,
      singleMealId: '',
    }
  },
  methods: {
    async getMeals() {
      try {
        this.isLoading = true;
        this.mealsList = [];
        const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.meal}`);
        const data = await resp.json();
        const info = data.meals;
        this.mealsList.push(info);
        this.isLoading = false;
      } catch (error) {
          console.log(error);
      }
    },

    showSingleMeal(id) {
      this.singleMealId = id;
      this.click(true);
    },

    ...mapActions({
      click: 'setIsClicked'
    })
  },
  computed: {
    ...mapState({
      clicked: state => state.isClicked
    })
  }
}
</script>
