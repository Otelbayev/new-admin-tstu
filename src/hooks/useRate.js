export const useRate = (rate) => {
  if (rate < 22 && rate > 0) {
    return 1;
  } else if (rate < 44 && rate >= 22) {
    return 2;
  } else if (rate < 66 && rate >= 44) {
    return 3;
  } else if (rate < 88 && rate >= 66) {
    return 4;
  } else if (rate <= 110 && rate >= 88) {
    return 5;
  }
};
