export default {
  haveLogined (state, isLogined) {
    console.log(isLogined)
    state.isLogined = isLogined
    try {
      localStorage.isLogined = isLogined
    } catch (e) {}
  },
  doLogined (state, userName) {
    console.log(userName)
    state.userName = userName
    try {
      localStorage.userName = userName
    } catch (e) {}
  }
}
