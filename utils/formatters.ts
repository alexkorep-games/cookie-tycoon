
export const formatNumber = (num: number): string => {
  if (Math.abs(num) < 1000) {
    return num.toFixed(0);
  }
  const units = ['K', 'M', 'B', 'T', 'Q', 'Qt', 'Sx', 'Sp', 'Oc', 'No', 'Dc'];
  let i = 0;
  let value = num;
  while (Math.abs(value) >= 1000 && i < units.length -1) {
    value /= 1000;
    i++;
  }
  return `${value.toFixed(1)}${units[i-1] || ''}`; // i-1 because first threshold is 1000
};

export const formatNumberExact = (num: number): string => {
  return Math.floor(num).toLocaleString();
};
