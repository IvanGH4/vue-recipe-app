<template>
    <div class="modal flex-center px-40">
        <Loader v-if="isLoading" />
        <div class="py-40 px-40 bg-light" v-for="(item,idx) in meal" :key="idx">
            <div v-for="(ob, idx) in item" :key="idx">
                <div class="title">
                    <h4>Instructions to preparation</h4>
                    <button class="px-15 py-5 bg-dark text-light rounded-lg" @click="closeModal">Close</button>
                </div>
                <p class="my-10">
                    {{ob.strInstructions}}
                </p>
                <h5>Ingredients</h5>
                <ul>
                    <li>
                        {{ob.strIngredient1}}
                    </li>
                    <li>
                        {{ob.strIngredient2}}
                    </li>
                    <li>
                        {{ob.strIngredient3}}
                    </li>
                    <li>
                        {{ob.strIngredient4}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import Loader from '@/components/share-tools/Loader';

export default {
    name: 'SingleMeal',
    components: {
        Loader
    },
    props: {
        id: {
            type: String,
        }
    },
    data() {
        return {
            meal: [],
            isLoading: false
        }
    },
    async mounted() {
        try {
            this.isLoading = true;
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.id}`);
            const data = await res.json();
            console.log(data.meals);
            const mealData = data.meals;
            this.meal.push(mealData);
            this.isLoading = false;
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        closeModal() {
            this.click(false);
        },
        ...mapActions({
            click: 'setIsClicked'
        })
    }
}
</script>