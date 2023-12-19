const statusUpdateds = new Map()

export const statusUpdatedService = {
  postUpdate (status: any) {
    const id = Math.floor(Math.random() * 1000000)
    statusUpdateds.set(id, status)
    console.log(`Status updated: ${status}`)
    return id
  },

  destroyUpdate (id: number) {
    statusUpdateds.delete(id)
    console.log(`Status removed: ${id}`)
  }
}