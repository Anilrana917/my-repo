<template>
  <div class="pdp-page d-flex">
    <div class="left-section w-50">
      <v-img :src="product.image" class="w-50 ma-auto imgBox">
        <template #sources>
          <source :srcset="product.image" />
        </template>
      </v-img>
    </div>
    <div class="right-section w-50">
      <v-card-item>
        <v-card-title>{{ product.title }}</v-card-title>

        <v-card-subtitle>
          <span class="me-1">Local Favorite</span>

          <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
        </v-card-subtitle>
      </v-card-item>

      <v-card-text>
        <!-- {{ product.rating.count }} -->
        <v-row align="center" class="mx-0">
          <v-rating
            v-if="product.rating && product.rating.rate"
            :model-value="product.rating.rate"
            color="amber"
            density="compact"
            half-increments
            readonly
            size="small"
          ></v-rating>

          <div
            class="text-grey ms-4"
            v-if="product.rating && product.rating.rate"
          >
            {{ product.rating.rate }} ({{ product.rating.count }})
          </div>
        </v-row>

        <div class="my-4 text-subtitle-1">₹{{ product.price }}</div>

        <div>{{ product.description }}</div>

        <v-col cols="auto" class="add-cart">
          <v-btn density="default">Add To Cart</v-btn>
        </v-col>
      </v-card-text>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Plp",
  data: () => ({
    loading: false,
    product: {},
  }),
  methods: {
    fetchProduct(id) {
      axios
        .get(`https://fakestoreapi.com/products/${id}`)
        .then((res) => {
          this.product = res.data;
          console.log("kkk", this.product);
        })
        .catch((err) => console.error(err));
    },
  },
  mounted() {
    const id = this.$route.params.id;
    this.fetchProduct(id);
  },
};
</script>

<style scoped>
.imgBox {
  margin-top: 40px !important;
}
.add-cart{
    padding-left: 0;
}
.right-section{
    margin-top: 30px;
}

</style>