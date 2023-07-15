<template>
  <h2 class="pa-2 text-center head">Shopper's Point</h2>
  <v-btn @click="toggleTheme" class="toggelTheme">toggle theme</v-btn>
  <div class="plp-page">
    <div class="search-box">
      <v-text-field
        label="Search"
        hide-details="auto"
        v-model="searchQuery"
        @keyup="filteredResults"
      ></v-text-field>
    </div>
    <div class="inner-div">
      <v-card
        :loading="loading"
        class="mx-auto my-12 cards"
        max-width="374"
        v-for="item of result"
        :key="item.id"
        :class="item.category"
      >
        <template v-slot:loader="{ isActive }">
          <v-progress-linear
            :active="isActive"
            color="deep-purple"
            height="4"
            indeterminate
          ></v-progress-linear>
        </template>

        <router-link :to="{ name: 'pdp', params: { id: item.id } }">
          <v-img contain height="250" :src="item.image"></v-img>
        </router-link>

        <v-card-item>
          <v-card-title>{{ item.title }}</v-card-title>

          <v-card-subtitle>
            <span class="me-1">Local Favorite</span>

            <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
          </v-card-subtitle>
        </v-card-item>

        <v-card-text>
          <v-row align="center" class="mx-0">
            <v-rating
              :model-value="item.rating.rate"
              color="amber"
              density="compact"
              half-increments
              readonly
              size="small"
            ></v-rating>

            <div class="text-grey ms-4">
              {{ item.rating.rate }} ({{ item.rating.count }})
            </div>
          </v-row>

          <div class="my-4 text-subtitle-1">₹{{ item.price }}</div>

          <div>{{ item.description.slice(0, 130) }}...</div>
        </v-card-text>

        <v-divider class="mx-4 mb-1"></v-divider>

        <v-card-actions>
          <v-btn
            color="deep-purple-lighten-2"
            variant="text"
            :to="{ name: 'pdp', params: { id: item.id } }"
          >
            More Details & Cart
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useTheme } from 'vuetify'
export default {
  name: "Plp",

  data: () => ({
    loading: false,
    selection: 1,
    result: [],
    searchQuery: "",
    serachR: [],
  }),
  setup () {
    const theme = useTheme()

    return {
      theme,
      toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    }
  },
  methods: {
    fetchData() {
      axios
        .get("https://fakestoreapi.com/products")
        .then((res) => {
          this.result = res.data;
          // console.log("33333", this.result);
        })
        .catch((err) => console.error(err));
    },
    filteredResults() {
      if (this.searchQuery.trim() === "") {
        return this.serachR;
      }
      const searchQuery = this.searchQuery.toLowerCase().trim();

      let cards = document.querySelectorAll(".inner-div .cards");
      cards.forEach((i) => {
        if (i.className.includes(searchQuery)) {
          i.style.display = "block";
        } else if (!i.className.includes(searchQuery)) {
          i.style.display = "none";
        }
      });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.inner-div {
  display: flex;
  flex-wrap: wrap;
}
.search-box {
  width: 50% !important;
  margin: auto;
  margin-top: 24px;
}
.head {
    font-family: cursive;
    font-style: oblique;
    background: #6f90cb;
}
.cards .v-img{
  background: #fff !important;
}
.toggelTheme {
    position: absolute;
    right: 0px;
    border-radius: 0;
    top: 8px;
}
@media only screen and (max-width: 768px) {
  .search-box {
    width: 94% !important;
  }
  
}
</style>






