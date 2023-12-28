import { concatFiles } from './concat-files'

async function main() {
  try {
    await concatFiles(
      process.argv[2] as string,
      process.argv.slice(3) as string[]
    )
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('Files concatenated successfully')
}

main()
