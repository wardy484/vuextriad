<template>
  <div
    class="relative h-full w-full text-white text-2xl text-bold rounded-lg flex flex-col justify-between"
    :class="classes"
  >
    <img :src="bgImage(card.image)" class="w-full h-full" />
    <div class="w-3/12 leading-none mt-2 ml-2 absolute p-2">
      <div class="w-full">{{ card.top }}</div>

      <div class="w-full flex justify-between">
        <span>{{ card.left }}</span>
        <span>{{ card.right }}</span>
      </div>

      <div class="w-full">{{ card.bottom }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object
    }
  },

  data() {
    return {
      selected: false
    };
  },

  computed: {
    classes() {
      return {
        "bg-red-500": this.card.belongsTo && this.card.belongsTo !== 1,
        "bg-blue-500": !this.card.belongsTo || this.card.belongsTo !== 2,
        "border-4 border-black": this.card.selected
      };
    }
  },

  methods: {
    bgImage(card) {
      return "http://localhost:8081/cards/" + card;
    }
  }
};
</script>
