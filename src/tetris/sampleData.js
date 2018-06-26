const prepareData = () => {
  const data = [];
  for (let i = 0; i < 20; ++i) {
    const row = [];
    for (let j = 0; j < 10; ++j) {
      row.push(j);
    }
    data.push(row);
  }
  return data;
};

export default prepareData;
