export default {
  haveLogined (state, isLogined) {
    state.isLogined = isLogined
    try {
      localStorage.isLogined = isLogined
    } catch (e) {}
  },
  doLogined (state, userName) {
    state.userName = userName
    try {
      localStorage.userName = userName
    } catch (e) {}
  },
  addProduct (state, product) {
    state.productList = state.productList.concat(product)
    try {
      localStorage.productList = JSON.stringify(state.productList)
    } catch (e) {}
  },
  deleteProduct (state, skinName) {
    for (var i in state.productList) {
      if (state.productList[i].skinName === skinName) {
        state.productList.splice(i, 1)
        try {
          localStorage.productList = JSON.stringify(state.productList)
        } catch (e) {}
        return
      }
    }
  },
  removeProduct (state, checkArr) {
    for (var i in checkArr) {
      for (var j in state.productList) {
        if (state.productList[j].skinName === checkArr[i]) {
          state.productList.splice(j, 1)
        }
      }
    }
    try {
      localStorage.productList = JSON.stringify(state.productList)
    } catch (e) {}
  }
}
