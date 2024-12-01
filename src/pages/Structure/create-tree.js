export const createTree = (data) => {
  const map = new Map();
  const tree = [];

  // Dastlab har bir elementni id bo'yicha xaritada saqlaymiz
  data.forEach((item) => {
    map.set(item.id, { ...item, children: [] });
  });

  // Har bir elementni ota-id bo'yicha daraxtga joylaymiz
  data.forEach((item) => {
    if (item.parent_id === 0) {
      tree.push(map.get(item.id));
    } else {
      const parent = map.get(item.parent_id);
      if (parent) {
        parent.children.push(map.get(item.id));
      }
    }
  });

  return tree;
};
