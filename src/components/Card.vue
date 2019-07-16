<template>
  <div
    class="h-full w-full text-white text-2xl text-bold p-2 flex flex-col justify-between"
    :class="bgColor"
  >
    <div class="w-full">{{ card.top }}</div>

    <div class="w-full flex justify-between">
      <span>{{ card.left }}</span>
      <span>{{ card.name }}</span>
      <span>{{ card.right }}</span>
    </div>

    <div class="w-full">{{ card.bottom }}</div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object
    }
  },

  computed: {
    bgColor() {
      if (this.card.belongsTo === 1) {
        return "bg-blue-500";
      }

      return "bg-red-500";
    }
  }
};
</script>
