class Boat {
  constructor(allProps: {}) {
    Object.assign(this, allProps)
  }
}

class BoatBuilder {
  motorCount: number = 0
  brand: string = ''
  motorModel: string = ''
  hasMotor: boolean = false
  hasSails: boolean = false
  sailCount: number = 0
  material: string = ''
  sailsColor: string = ''
  model: string = ''
  hullColor: string = ''
  hasCabin: boolean = false

  withMotors(count: number, brand: string, model: string) {
    this.hasMotor = true
    this.motorCount = count
    this.brand = brand
    this.motorModel = model
    return this
  }

  withSails(count: number, material: string, color: string) {
    this.hasSails = true
    this.sailCount = count
    this.material = material
    this.sailsColor = color
    return this
  }

  whithHullColor(color: string) {
    this.hullColor = color
    return this
  }

  withCabin() {
    this.hasCabin = true
    return this
  }

  build() {
    return new Boat({
      motorCount: this.motorCount,
      brand: this.brand,
      motorModel: this.motorModel,
      hasMotor: this.hasMotor,
      hasSails: this.hasSails,
      sailCount: this.sailCount,
      material: this.material,
      sailsColor: this.sailsColor,
      model: this.model,
      hullColor: this.hullColor,
      hasCabin: this.hasCabin
    })
  }
}

const myBoat = new BoatBuilder()
  .withMotors(2, 'Yamaha', 'V8')
  .withSails(2, 'Canvas', 'White')
  .whithHullColor('Blue')
  .withCabin()
  .build()

console.log(myBoat)
