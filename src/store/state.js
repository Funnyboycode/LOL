let defaultUserName = 'admin'
let defaultIsLogined = 'no'
let defaultProductList = []
try {
  if (localStorage.userName) {
    defaultUserName = localStorage.userName
  }
} catch (e) {}
try {
  if (localStorage.isLogined) {
    defaultIsLogined = localStorage.isLogined
  }
} catch (e) {}
try {
  if (localStorage.productList) {
    defaultProductList = JSON.parse(localStorage.productList)
  }
} catch (e) {}
export default {
  isLogined: defaultIsLogined,
  userName: defaultUserName,
  productList: defaultProductList
}
