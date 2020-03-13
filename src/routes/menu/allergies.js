const allergies = [
  { code: 'H', nameNO: 'hvete', nameEN: 'corn' },
  { code: 'SK', nameNO: 'skalldyr', nameEN: 'shellfish' },
  { code: 'E', nameNO: 'egg', nameEN: 'egg' },
  { code: 'F', nameNO: 'fisk', nameEN: 'fish' },
  { code: 'PE', nameNO: 'peanøtter', nameEN: 'peanut' },
  { code: 'SO', nameNO: 'soya', nameEN: 'soy' },
  { code: 'MI', nameNO: 'melk', nameEN: 'milk' },
  { code: 'N', nameNO: 'nøtter', nameEN: 'nuts' },
  { code: 'C', nameNO: 'selleri', nameEN: 'celery' },
  { code: 'SE', nameNO: 'sesamfrø', nameEN: 'sesame_seeds' },
  {
    code: 'SDS',
    nameNO: 'svoveldioksid_sulfitt',
    nameEN: 'sulfur_dioxide_sulfitt'
  },
  { code: 'MU', nameNO: 'sennep', nameEN: 'mustard' },
  { code: 'MO', nameNO: 'bløtdyr', nameEN: 'molluscs' },
  { code: 'L', nameNO: 'lupin', nameEN: 'lupin' }
]

const getAllergyByCodeOrName = code => {
  if(!code || typeof code !== 'string') {
    throw new Error('Invalid or not existing property')
  }

  return allergies.find(item => item.code === code || item.nameNO === code)
}

module.exports = {
  getAllergyByCodeOrName
}