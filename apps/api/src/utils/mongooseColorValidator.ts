export default function colorValidator(color) {
  const colorRegex =
    /#[a-f\d]{3}(?:[a-f\d]?|(?:[a-f\d]{3}(?:[a-f\d]{2})?)?)\b/gim;
  return colorRegex.test(color);
}
