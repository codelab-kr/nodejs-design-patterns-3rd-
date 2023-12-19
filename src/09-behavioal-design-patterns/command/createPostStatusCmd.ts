export function createPostStatusCmd(service: any, status: any) {
  let postId: null | number = null

  return {
    run() {
      postId = service.postUpdate(status)
    },

    undo() {
      if (postId) {
        service.destroyUpdate(postId)
        postId = null
      }
    },

    serialize() {
      return { type: 'status', action: 'post', status }
    }
  }
}
