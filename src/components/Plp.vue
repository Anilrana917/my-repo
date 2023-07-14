<template>
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
        class="mx-auto my-12"
        max-width="374"
        v-for="item of result"
        :key="item.id"
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
            @click="addToCart(item)"
          >
            Add To Card
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Plp",
  data: () => ({
    loading: false,
    selection: 1,
    result: [],
    searchQuery: '',
    serachR: []
  }),
  methods: {
    fetchData() {
      axios
        .get("https://fakestoreapi.com/products")
        .then((res) => {
          this.result = res.data;
          console.log("33333", this.result);
        })
        .catch((err) => console.error(err));
    },
    addToCart(event) {
      console.log(event, "event");
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
  },
  computed: {
    // filteredResults() {
    //   if (this.searchQuery.trim() === "") {
    //     return this.serachR;
    //   }
    //   const searchQuery = this.searchQuery.toLowerCase().trim();
    //   return this.result.filter((item) =>
    //   console.log(item.title.toLowerCase().includes(this.searchQuery),'item')
    //   );
    // },
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
</style>






