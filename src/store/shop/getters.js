/*
export function someGetter (state) {
}
*/
// 處理購物車顯示資料：由商品主檔帶出商品資料
export function cartProducts(state) {
    return state.items.map(({ product, quantity, specArray }) => {
        // 將specArray轉成specString供畫面顯示
        var specString = "";
        var specInfo = "";
        for (var i = 0; i < specArray.length; i++) {
            for (var j = 0; j < product.specs.length; j++) {
                specInfo = product.specs[j].items.find(
                    specItem => specItem.id === specArray[i]
                );
                if (specInfo != undefined) {
                    specString = specString + specInfo.name + " /";
                }
            }
        }
        return {
            product,
            name: product.name,
            price: product.price,
            quantity,
            specArray,
            specString: specString,
            subtotal: product.price * quantity
        };
    });
}
