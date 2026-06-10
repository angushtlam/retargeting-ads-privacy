// Random asset selection - returns the selected filename
export function getRandomAsset(): string {
  const rand = Math.floor(Math.random() * 7);
  const assets = ['apple', 'candy', 'cap', 'cookies', 'flower', 'phone', 'shoe'];
  return assets[rand] || 'candy';
}

// Apply the random asset to the page
export function applyRandomAsset(): void {
  const filename = getRandomAsset();
  const imgElement = document.getElementById('fixed_item') as HTMLImageElement;
  if (imgElement) {
    imgElement.src = `/images/${filename}.svg`;
  }
}
