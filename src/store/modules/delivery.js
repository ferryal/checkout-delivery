const state = {
  checkoutDetail: {
    fee: 0,
    cost: 500000,
    totalAmount: 0
  },
  summary: {
    delivery: '',
    deliveryFee: 0,
    estimation: '',
    payment: '',
    totalAmount: 0
  }
}

const getters = {
  fee: state => state.checkoutDetail.fee,
  checkoutDetail: state => state.checkoutDetail,
  summary: state => state.summary
}

const mutations = {
  addProduct ({payload}, checkoutDetail) {
    state.checkoutDetail.fee = checkoutDetail.fee
    state.checkoutDetail.totalAmount = state.checkoutDetail.fee + state.checkoutDetail.cost
  },
  addSummary ({payload}, summary) {
    state.summary = summary
    console.log(state.summary)
  }
}

const actions = {
  addProduct: ({ commit, payload }) => {
    commit('addProduct', payload)
  },
  addSummary: ({ commit, payload }) => {
    commit('addSummary', payload)
  }
}

export default {
  actions,
  getters,
  mutations,
  state
}
