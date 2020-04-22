/*
export function someMutation (state) {
}
*/
// 設定NavBar是否顯示
export function setqheaderShow(state, qheaderShow) {
    state.qheader = qheaderShow
}
// 取得店家
export function setShop(state, payload) {
    state.shops = payload;
}
// 取得店家商品
export function setCategory(state, payload) {
    state.categorys = payload;
}
// 取得店家商品細項
export function setProducts(state, payload) {
    state.products = payload;
}
//加入購物車
export function SaveCart(state, payload) { }

// 設定營業中店家及其商品資料
export function setShops(state, shops) {
    state.shops = shops;
}
// 清空購物車
export function clearCart(state) {
    state.items = [];
    state.shopID = null;
}
// 新增商品到購物車
export function pushProductToCart(
    state,
    { product, quantity, specArray, specObjArr }
) {
    state.items.push({
        product,
        quantity,
        specArray,
        specObjArr
    });
}
// 疊加商品的數量
export function incrementItemQuantity(state, { product, quantity, specArray }) {
    const cartItem = state.items.find(
        item =>
            item.product.id === product.id &&
            JSON.stringify(item.specArray) === JSON.stringify(specArray)
    );
    cartItem.quantity += quantity;
}
// 更新商品的數量
export function updateItemQuantity(state, { product, quantity, specArray }) {
    const cartItem = state.items.find(
        item =>
            item.product.id === product.id &&
            JSON.stringify(item.specArray) === JSON.stringify(specArray)
    );
    cartItem.quantity = quantity;
}
// 從購物車移除商品
export function removeProductFromCart(state, i) {
    state.items.splice(i, 1);
    // 若購物車沒有商品時，清空目前商家
    if (state.items.length == 0) state.shopID = null;
}
// 設定購物車結帳狀態
export function setCheckoutStatus(state, status) {
    state.checkoutStatus = status;
}
// 設定購物車目前商家
export function setShopID(state, shopID) {
    state.shopID = shopID;
}
