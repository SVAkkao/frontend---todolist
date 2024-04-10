import React from 'react';

const recommendations = {
  "行前建議": [
    "請穿著輕便透氣的衣物,以應對高溫天氣。",
    "攜帶防曬用品,包括帽子、太陽眼鏡和高SPF值的防曬霜。",
    "攜帶足夠的水份以保持水分補充。",
    "由於天氣炎熱,請避免長時間暴露在陽光下,尤其是中午時段。",
    "當天氣變化較大時,準備一件輕便外套或披肩,以應對夜間稍微降溫的情況。"
  ],
  "景點推薦": [
    {
      "名稱": "安東尼奧夫城堡 (Castillo de San Juan de Ulúa)",
      "描述": "這座城堡是一個歷史悠久的要塞,位於沿海,提供了壯觀的海景和悠久的歷史。",
      "活動": [
        "參觀城堡內部的展覽和歷史遺跡",
        "享受沿海地區的美景和海濱散步",
        "拍攝壯觀的城堡建築和海景"
      ]
    },
    {
      "名稱": "哈爾葛林古城 (El Tajín Archaeological Zone)", 
      "描述": "這個古城是世界上最重要的土著文化之一,擁有壯觀的金字塔和遺跡。",
      "活動": [
        "參觀古城中的金字塔和其他遺跡",
        "了解古代土著文化的歷史和生活方式",
        "拍攝古城遺跡的壯麗景色"
      ]
    },
    {
      "名稱": "赫里辛古城 (Cempoala Archaeological Zone)",
      "描述": "這座古城是阿茲特克文明的一部分,擁有壯觀的建築和遺跡。",
      "活動": [
        "參觀古城中的建築和遺跡",
        "了解阿茲特克文明的歷史和文化",
        "在古城周圍的自然環境中漫步和探索"
      ]
    }
  ]
};

const RecommendationsList = ({ recommendations }) => {
  // 確保 recommendations 不為空或未定義
  if (!recommendations) {
    return null; // 或者渲染一個加載中的指示器
  }

  const hasSuggestions = '行前建議' in recommendations;
  const hasAttractions = '景點推薦' in recommendations;

  return (
    <div>
      {hasSuggestions && (
        <>
          <h3>行前建議</h3>
          <ul>
            {recommendations['行前建議'].map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </>
      )}

      {hasAttractions && (
        <>
          <h3>景點推薦</h3>
          {recommendations['景點推薦'].map((attraction, index) => (
            <div key={index}>
              <h4>{attraction['名稱']}</h4>
              <p>{attraction['描述']}</p>
              <h5>活動:</h5>
              {attraction['活動'] ? (
                <ul>
                  {attraction['活動'].map((activity, activityIndex) => (
                    <li key={activityIndex}>{activity}</li>
                  ))}
                </ul>
              ) : (
                <p>暫無活動</p>
              )}
            </div>
          ))}
        </>
      )}

      {!hasSuggestions && !hasAttractions && <p>暫無建議和景點推薦</p>}
    </div>
  );
};
export default RecommendationsList;