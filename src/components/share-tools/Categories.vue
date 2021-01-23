<template>
  <div>
      <div class="categories-btns" v-for="(cats, idx) in categories" :key="idx">
          <button class="text-light cat-btn" v-for="(item, idx) in cats" :key="idx" @click="getMealsByCategory(item.strCategory)">
              {{item.strCategory}}
          </button>
      </div>

    <template v-if="toggleResults">
      <div class="cards-wrapper" v-for="(item, idx) in meals" :key="idx">
          <div class="card mx-5 my-10 py-10 px-15 rounded-sm w-sm" v-for="(obj) in item" :key="obj">
                <div class="card-head">
                    <h3>
                        {{obj.strMeal}}
                    </h3>
                    <img class="rounded-full" :src="obj.strMealThumb" alt="#" />
                </div>
          </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'Categories',
    data() {
        return {
            categories: [],
            meals: [],
        }
    },
    async mounted() {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await res.json();

        this.categories.push(data.categories);
    },
    methods: {
        async getMealsByCategory(cat) {
            this.meals = [];
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
            const data = await res.json();
            const mealsData = data.meals;

            this.meals.push(mealsData);
            this.toggle(true);
        },
        ...mapActions({
            toggle: 'setShowCatg',
        })
    },
    computed: {
        ...mapState({
            show: state => state.showCatg,
        }),
        toggleResults() {
            return this.show;
        }
    }
}
</script>