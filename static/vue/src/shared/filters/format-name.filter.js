export default (value) => {
  if (value) {
    const splitedName = value.split(' ');
    return splitedName.reduce((prev, next) => prev[0].toUpperCase() + next[0].toUpperCase());
  }
  return '';
};
