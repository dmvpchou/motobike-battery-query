let data;

// 讀取 JSON 文件
fetch('battery_data.json')
    .then(response => response.json())
    .then(json => {
        data = json;
    })
    .catch(error => console.error('載入 JSON 資料時出錯:', error));

// 查詢電池規格
function searchBatterySpec() {
    const modelOrBrand = document.getElementById('modelInput').value.trim().toUpperCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (modelOrBrand && data) {
        let foundResults = [];

        // 遍歷所有品牌的數據，查找符合的車型或品牌
        for (const brand in data) {
            if (brand.toUpperCase() === modelOrBrand) {
                // 如果輸入的是品牌，列出所有該品牌的車型
                foundResults = data[brand].map(item => ({
                    brand: brand,
                    model: item.model,
                    battery_spec: item.battery_spec,
                    blue_knight_spec: item.blue_knight_spec
                }));
                break;
            } else {
                // 否則模糊查詢符合的車型名稱
                data[brand].forEach(item => {
                    if (item.model.toUpperCase().includes(modelOrBrand)) {
                        foundResults.push({
                            brand: brand,
                            model: item.model,
                            battery_spec: item.battery_spec,
                            blue_knight_spec: item.blue_knight_spec
                        });
                    }
                });
            }
        }

        // 顯示查詢結果
        if (foundResults.length > 0) {
            foundResults.forEach(result => {
                resultDiv.innerHTML += `<p>品牌：${result.brand}<br>車型：${result.model}<br>電池規格：${result.battery_spec}<br>藍騎士規格：${result.blue_knight_spec}</p><hr>`;
            });
        } else {
            resultDiv.innerHTML = `<p>找不到相應的車型或品牌。</p>`;
        }
    } else {
        resultDiv.innerHTML = `<p>請輸入車型或品牌名稱。</p>`;
    }
}