function createPerson(name: string) {
  const privateProperties = {
    name
  }

  const person = {
    setName(name: string) {
      if (!name) {
        throw new Error('A person must have a name')
      }
      privateProperties.name = name
    },
    getName() {
      return privateProperties.name
    }
  }

  person.setName(name)
  return person
}
