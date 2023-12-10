class Profiler {
  constructor(private label: string) {
    this.label = label
    this.lastTime = null
  }

  private lastTime: [number, number] | null

  start() {
    this.lastTime = process.hrtime()
  }

  end() {
    const diff = process.hrtime(this.lastTime!)
    console.log(
      `Timer "${this.label}" took ${diff[0]} seconds and ${diff[1]} nanoseconds.`
    )
  }
}

const noopProfiler = {
  start() {},
  end() {}
}

export function createProfiler(label: string) {
  if (process.env.NODE_ENV === 'production') {
    return noopProfiler
  }
  return new Profiler(label)
}
