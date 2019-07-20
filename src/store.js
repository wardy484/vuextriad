import Vue from "vue";
import Vuex from "vuex";
import Board from "./app/Board";

import Cards from "@/data/cards.json";
import Hand from "./app/Hand";
import ScoreCalculator from "./app/ScoreCalculator";

Vue.use(Vuex);

const p2 = new Hand([]);

for (var i = 0; i < 5; i++) {
  const card = { ...Cards[i] };
  card.belongsTo = 2;

  p2.addCard(card);
}

const store = new Vuex.Store({
  state: {
    inGame: false,
    currentPlayer: 1,
    selectedCard: null,
    board: new Board(),
    player1Hand: new Hand([]),
    player2Hand: p2
  },

  getters: {
    player1Score(state) {
      return ScoreCalculator(
        state.player1Hand,
        state.board.getCellsBelongingToPlayer(1)
      );
    },

    player2Score(state) {
      return ScoreCalculator(
        state.player2Hand,
        state.board.getCellsBelongingToPlayer(2)
      );
    },

    currentCard(state, getters) {
      return getters.currentPlayersCard.getCard(state.selectedCard);
    },

    currentPlayersCard(state) {
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
    },

    setGame(state, value) {
      state.inGame = value;
    },

    setPlayer1Hand(state, hand) {
      state.player1Hand = hand;
    }
  },

  actions: {
    startGame({ commit }) {
      commit("setGame", true);
    },

    selectCard({ state, commit, getters }, { index, hand }) {
      if (state.currentPlayer === hand) {
        if (getters.currentCard) {
          getters.currentCard.selected = false;
        }

        commit("setSelectedCard", index);

        getters.currentCard.selected = true;
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
        player: getters.currentPlayersCard,
        index: state.selectedCard
      });

      commit("setSelectedCard", null);

      commit("setCurrentPlayer", state.currentPlayer === 1 ? 2 : 1);
    }
  }
});

export default store;
