export default (text, length, clamp) => {
  const t = text || '';
  const l = length || 50;
  const c = clamp || '';
  return t.slice(0, l) + c;
};
