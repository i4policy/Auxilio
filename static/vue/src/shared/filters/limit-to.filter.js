export default (text, length, clamp) => {
  const t = text || '';
  const l = length || 50;
  const c = clamp || '';
  const result = t.slice(0, l);

  return t.length > l ? `${result}${c}` : result;
};
