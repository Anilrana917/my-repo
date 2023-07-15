<template>
  <h2 class="pa-2 text-center head">Shopper's Point</h2>
  <v-btn @click="toggleTheme" class="toggelTheme">toggle theme</v-btn>
  <div class="text-center modelSec">
    <v-dialog v-model="dialog" width="auto">
      <template v-slot:activator="{ props }">
        <v-btn v-show="isActive" color="primary" v-bind="props"
          >Open Cart</v-btn
        >
      </template>

      <v-card>
        <div class="cart-section">
          <div class="cartInner">
            <v-img :src="cartImg" class="cart-img">
              <template #sources>
                <source :srcset="cartImg" />
              </template>
            </v-img>
            <div class="text-subtitle-1">{{ cartTitle }}</div>
            <div class="text-subtitle-1">₹{{ cartPrice }}</div>
          </div>
        </div>
        <!-- <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </v-card-text> -->
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false"
            >Close Cart</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
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
          <v-btn density="default" @click="addToCart(product)"
            >Add To Cart</v-btn
          >
        </v-col>
      </v-card-text>
      <v-col cols="auto">
        <v-btn density="comfortable">
          <router-link to="/" style="text-decoration: unset"
            >Go to Home</router-link
          ></v-btn
        >
      </v-col>
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
    product: {},
    cartImg: "",
    cartTitle: "",
    cartPrice: "",
    dialog: false,
    isActive: false,
  }),
  setup () {
    const theme = useTheme()

    return {
      theme,
      toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    }
  },
  methods: {
    fetchProduct(id) {
      axios
        .get(`https://fakestoreapi.com/products/${id}`)
        .then((res) => {
          this.product = res.data;
        })
        .catch((err) => console.error(err));
    },

    addToCart(product) {
      const quantity = 1;
      this.$store.commit("ADD_TO_CART", { product: this.product, quantity });

      this.$store.state.cart.forEach((el) => {
        this.cartTitle = el.product.title;
        this.cartImg = el.product.image;
        this.cartPrice = el.product.price;
      });

      this.isActive = true;
    },
  },

  mounted() {
    const id = this.$route.params.id;
    this.fetchProduct(id);
  },
};
</script>

<style scoped>
.v-img{
  background: #fff !important;
}
.imgBox {
  margin-top: 40px !important;
}
.add-cart {
  padding-left: 0;
}
.right-section {
  margin-top: 30px;
}
.cart-img {
  width: 100% !important ;
}
.cartInner {
  margin: 20px 60px;
}
.cart-section {
  margin: 20px 60px;
}
.head {
    font-family: cursive;
    font-style: oblique;
    background: #6f90cb;
    margin-bottom: 14px;
}
.toggelTheme {
    position: absolute;
    top: 8px;
    right: 0px;
    border-radius: 0;
}
.modelSec {
    position: absolute;
    right: 0;
}
@media only screen and (max-width: 768px) {
  .imgBox[data-v-c22f7ae1] {
    width: 92% !important;
    object-fit: contain;
    margin: 0 auto !important;
}
  .head {
    text-align: start !important;
    padding-left: 16px !important;
}
  .inner-div {
    padding: 0 15px;
  }
  .right-section {
    width: 100% !important;
  }
  .left-section {
    width: 100% !important;
  }
  .pdp-page.d-flex {
    flex-wrap: wrap;
  }
  .modelSec {
    text-align: end !important;
    position: absolute;
    top: 52px;
    right: 0;
    z-index: 99;

  }
  .modelSec button {
    border-radius: 0;
  }
  .cart-section {
    margin: 0;
  }
  .cartInner {
    margin: 70px 60px;
  }
}
</style>