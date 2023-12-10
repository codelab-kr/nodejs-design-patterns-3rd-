import { createObservable } from "./opservable";

function calculateTotal (invoice: any) {
  // return invoice.reduce((acc, curr) => acc + curr.price, 0)
  return invoice.subtotal - invoice.discount + invoice.tax;
}

const invoice = {
  subtotal: 100,
  discount: 10,
  tax: 20
}

let total = calculateTotal(invoice)
console.log(`Starting total: ${total}`)

const obsInvoice = createObservable(invoice,
  ({prop, prev, curr}) => {
    total = calculateTotal(invoice)
    console.log(`Total: ${total} (${prop} changed: ${prev} -> ${curr})`)
  }
  )

obsInvoice.subtotal = 200
obsInvoice.discount = 20
obsInvoice.discount = 20
obsInvoice.tax = 30

console.log(`Final total: ${total}`)