import React from 'react';

const RecommendationsList = ({ recommendations }) => {
  return (
    <div>
      <h3>行前建議</h3>
      <ul>
        {recommendations['行前建議']?.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        )) || <p>暫無行前建議</p>}
      </ul>
      <h3>景點推薦</h3>
      {recommendations['景點推薦']?.map((item, index) => (
        <div key={index}>
          <h4>{item.名稱}</h4>
          <p>{item.描述}</p>
        </div>
      )) || <p>暫無景點推薦</p>}
    </div>
  );
};

export default RecommendationsList;