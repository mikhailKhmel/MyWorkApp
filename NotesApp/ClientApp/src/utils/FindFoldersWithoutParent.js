export function findFoldersWithoutParent(data) {
  const clearData = [...data.filter(x => !!x.parent)];
  const dataWithoutParent = [];
  let i = 0;
  while (i < clearData.length) {
    const parent = clearData[i].parent;
    const ids = data.find(x => x.id === parent &&
        !dataWithoutParent.map(x => x.id).includes(parent));
    if (!ids) {
      dataWithoutParent.push(clearData[i]);
    }
    i++;
  }
  return dataWithoutParent;
}