import { createPostStatusCmd } from "./createPostStatusCmd";
import { statusUpdatedService } from "./statusUpatedsService";
import { Invoker } from "./invoker";

const invoker = new Invoker()
const command = createPostStatusCmd(statusUpdatedService, 'Hello World')
invoker.run(command)
invoker.undo()
invoker.delay(command, 1000 * 3)
// invoker.runRemotely(command)