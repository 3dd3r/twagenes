const formatter = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function formatCurrency(bucks) {
  return formatter.format(bucks);
}
