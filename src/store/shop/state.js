export default function () {
  return {
    // 上方導航列
    qheader: true,
    // 店家資料
    shops: [],
    // 店家商品
    categorys: [],
    // 店家商品規格
    products: [],

    // 購物車商店代號
    shopID: null,
    // 購物車商品 (product: object, quantity: number, specArray: array, sepcObjArr: array)
    items: [],
    // 購物車結帳狀態 (null, 'successful, 'fail')
    checkoutStatus: null
  };
}
