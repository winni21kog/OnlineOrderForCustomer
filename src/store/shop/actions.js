import axios from "axios";

// API取得店家資料
export function GetShop({ commit }) {
    axios
        .get("https://localhost:44319/api/Shop")
        .then(res => {
            if (res.status == 200) {
                if (res.data.status == true) {
                    commit("setShop", res.data.shops);
                } else {
                    alert(res.data.message);
                    commit("setShops", []);
                }
            } else {
                alert(`查詢店家資料失敗!\nstatus code: ${res.data.status}`);
            }
        })
        .catch(error => {
            console.log(error);
            alert("查詢店家資料失敗!\n" + error);
        });
}
// API取得店家商品與商品規格
export function GetCategory({ commit }, id) {
    axios
        .get(`https://localhost:44319/api/Shop/QueryMenu?id=${id}`)
        .then(res => {
            if (res.status == 200) {
                if (res.data.status == true) {
                    commit("setCategory", res.data.categorys);
                    //second ajax
                    axios
                        .get(`https://localhost:44319/api/Shop/QueryProduct?id=${id}`)
                        .then(res => {
                            if (res.data.status == true) {
                                commit("setProducts", res.data.products);
                            } else {
                                alert(res.data.message);
                                commit("setProducts", []);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            alert("查詢店家商品規格失敗!\n" + error);
                        });
                } else {
                    alert(res.data.message);
                    commit("setCategory", []);
                }
            } else {
                alert(`查詢店家商品資料失敗!\nstatus code: ${res.data.status}`);
            }
        })
        .catch(error => {
            console.log(error);
            alert("查詢店家商品與商品規格失敗!\n" + error);
        });
}

// 加入購物車
export function addProductToCart(
    { state, commit },
    { product, quantity, selectedSpecs, specObjArr, shopID }
) {
    commit("setCheckoutStatus", null);
    commit("setShopID", shopID);
    const cartItem = state.items.find(
        item =>
            item.product.id === product.id &&
            JSON.stringify(item.specArray) === JSON.stringify(selectedSpecs)
    );

    if (!cartItem) {
        // 不存在的品項規格 => 新增
        commit("pushProductToCart", {
            product,
            quantity,
            specArray: selectedSpecs,
            specObjArr
        });
    } else {
        // 已存在的品項規格 => 增加數量
        commit("incrementItemQuantity", {
            product,
            quantity,
            specArray: selectedSpecs,
            specObjArr
        });
    }
}

// 更新購物車
export function updateProductToCart(
    { state, commit, dispatch },
    { product, quantity, selectedSpecs, specOld, specObjArr }
) {
    const cartItem = state.items.find(
        item =>
            item.product.id === product.id &&
            JSON.stringify(item.specArray) === JSON.stringify(selectedSpecs)
    );

    if (!cartItem) {
        // 不存在的品項規格 => 新增 + 移除
        // alert('不存在的品項規格\n新增規格: ' + selectedSpecs + '\n移除規格: ' + specOld) //Debug
        commit("pushProductToCart", {
            product,
            quantity,
            specArray: selectedSpecs,
            specObjArr
        });
        dispatch("deleteProductFromCart", { id: product.id, spec: specOld });
    } else {
        if (selectedSpecs == specOld) {
            // 已存在的品項規格，且新規格 == 舊規格 => 更新數量
            // alert('已存在的品項規格，且新規格 == 舊規格\n規格: ' + specOld + '\n數量更新為:' + quantity)  //Debug
            commit("updateItemQuantity", {
                product,
                quantity,
                specArray: selectedSpecs
            });
        } else {
            // 已存在的品項規格，但新規格 != 舊規格 => 疊加新規格的數量、移除舊規格
            // alert('已存在的品項規格，但新規格 != 舊規格\n移除舊規格: ' + specOld + '\n新規格: ' + selectedSpecs + '\n疊加數量: ' + quantity) //Debug
            commit("incrementItemQuantity", {
                product,
                quantity,
                specArray: selectedSpecs
            });
            dispatch("deleteProductFromCart", { id: product.id, spec: specOld });
        }
    }
}

// 從購物車移除商品
export function deleteProductFromCart({ state, commit }, { id, spec }) {
    for (var i = 0; i < state.items.length; i++) {
        if (
            state.items[i].product.id == id &&
            JSON.stringify(state.items[i].specArray) == JSON.stringify(spec)
        ) {
            commit("removeProductFromCart", i);
            break;
        }
    }
}

// 購物車結帳
export function checkOut({ state, commit }, { buyerInfo, token }) {
    return new Promise((resolve) => {
        // 取出購物車中要 POST 的屬性
        var prod = Object.keys(state.items).map(function (key) {
            return {
                id: state.items[key].product.id,
                quantity: state.items[key].quantity,
                items: state.items[key].specObjArr
            }
        })

        // commit('loading', true);

        // API: 成立訂單
        axios.post('https://localhost:44319/api/Order/Create', {
            products: prod,
            customer: buyerInfo.name,
            phone: buyerInfo.phone,
            email: buyerInfo.email,
            note: buyerInfo.note,
            token: token
        })
            .then(function (response) {
                console.log(response)
                // 查詢成功
                if (response.status == 200) {
                    // 後端回傳的狀態: false
                    if (response.data.status == false) {
                        commit('setCheckoutStatus', 'failed')
                        //commit('loading', false);
                        resolve()
                    }
                    // 後端回傳的狀態: true
                    else {
                        commit('setCheckoutStatus', 'successful')
                        //commit('loading', false);
                        resolve()
                    }
                }
                // 查詢失敗
                else {
                    alert('成立訂單失敗!\nstatus code: ' + response.data.status)
                    commit('setCheckoutStatus', 'failed')
                    //commit('loading', false);
                    resolve()
                }
            })
            .catch(function (error) {
                console.log(error);
                alert('成立訂單失敗!\n' + error)
            })
    })

}
