module.exports = {
  database: [],
  add(item) {
    if(!item) {
      throw new Error('No item was passed')
    }
    this.database.push(item)
    return item
  },
  list() {
    return this.database
  },
  remove(item) {
      if(!item || !item.id) {
        throw new Error('No item was passed')
      }
      this.database = this.database.filter(el => el.id !== item.id)
  },
  update(item) {
    if(!item || !item.id) {
      throw new Error('No item was passed')
    }

    const index = this.database.findIndex(el => el.id === item.id)
    if(index !== -1) {
      this.database[index] = item
      return true
    }
    return false
  },
  findByHash(item) {}
}