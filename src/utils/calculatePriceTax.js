const calculatePriceTax = (price, taxFactor) => {
  if(!price || typeof price !== 'number') {
    return
  }
  // Take-away and sit-here tax
  if(!taxFactor || typeof taxFactor !== 'number' || (taxFactor !== 1.15 && taxFactor !== 1.25)) {
    return
  } 
    const priceWithTax = price * taxFactor
    return Math.round(priceWithTax * 100) / 100
}

module.exports = calculatePriceTax
