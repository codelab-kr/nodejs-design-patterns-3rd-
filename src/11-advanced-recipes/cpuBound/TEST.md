curl -G http://localhost:8000/subsetSum --data-urlencode "data=[16,19,1,1,-16,1,-5,-2,17,-15,-97,-16,-4,-5,15]" --data-urlencode "sum=0"

쓰레드는 안 됨
/Users/bm/workspace/\_study/nodejs-design-patterns-3rd/src/11-high-level/cpuBound/workers/subsetSumThreadWorker.js:1
import { parentPort } from 'worker_threads'
^^^^^^

SyntaxError: Cannot use import statement outside a module
