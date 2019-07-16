import Vue from "vue";
import Vuex from "vuex";
import Board from "./app/Board";

import data from "@/hand.json";
import Hand from "./app/Hand";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentPlayer: 1,
    selectedCard: null,
    board: new Board(),
    player1Hand: new Hand([...data.player1]),
    player2Hand: new Hand([...data.player2])
  },

  getters: {
    player1Score(state) {
      // let score = state.players[0].length;

      // state.cells.forEach(row => {
      //   row.forEach(col => {
      //     if (col.hasCard && col.card.belongsTo === 1) {
      //       score++;
      //     }
      //   });
      // });

      return 5;
    },

    player2Score(state) {
      // let score = state.players[1].length;

      // state.cells.forEach(row => {
      //   row.forEach(col => {
      //     if (col.hasCard && col.card.belongsTo === 2) {
      //       score++;
      //     }
      //   });
      // });

      return 5;
    },

    currentCard(state, getters) {
      return getters.currentPlayersHard.getCard(state.selectedCard);
    },

    currentPlayersHard(state) {
      switch (state.currentPlayer) {
        case 1:
          return state.player1Hand;
        case 2:
          return state.player2Hand;
      }
    }
  },

  mutations: {
    setSelectedCard(state, card) {
      state.selectedCard = card;
    },

    removeCardFromHand(state, { player, index }) {
      player.removeCard(index);
    },

    updateCell(state, { x, y, card }) {
      state.board.placeCard(x, y, card);
    },

    setCurrentPlayer(state, newPlayer) {
      state.currentPlayer = newPlayer;
    }
  },

  actions: {
    selectCard({ state, commit }, { index, hand }) {
      if (state.currentPlayer === hand) {
        commit("setSelectedCard", index);
      }
    },

    playSelectedCard({ commit, state, getters }, { x, y }) {
      const cell = state.board.getCell(x, y);

      if (!cell || cell.hasCard || typeof state.selectedCard !== "number") {
        return;
      }

      commit("updateCell", {
        x,
        y,
        card: getters.currentCard
      });

      commit("removeCardFromHand", {
        player: getters.currentPlayersHard,
        index: state.selectedCard
      });

      commit("setSelectedCard", null);

      commit("setCurrentPlayer", state.currentPlayer === 1 ? 2 : 1);
    }
  }
});

export default store;
