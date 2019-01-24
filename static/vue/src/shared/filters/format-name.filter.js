export default (value) => {
  if (value) {
    const splitedName = value.split(' ');
    if (splitedName.length === 1) { return splitedName[0]; }
    return splitedName.reduce((prev, next) => prev[0].toUpperCase() + next[0].toUpperCase());
  }
  return '';
};
