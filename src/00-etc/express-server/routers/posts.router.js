const router = require('express').Router();
const { get } = require('http');
let posts = require('./posts.json');


getMaxId = () => {
  const maxId = posts.reduce((acc, cur) => {
    return acc.id > cur.id ? acc.id : cur.id;
  }, 0);
  return maxId;
}

getPostById = (id) => {
  if (!id) {
    throw new Error('id가 없습니다.');
  }
  const post = posts.filter((post) => post.id === +id)[0];
  if (!post) {
    throw new Error('게시글이 없습니다.');
  }
  return post;
}

function getPosts(_, res) {
  res.json(posts);
}

function getPost(req, res) {
  res.json(getPostById(req.params.id));
}

// curl -X POST -H "Content-Type: application/json" -d '{"title":"FirstName #1","content":"LastName #1"}' http://localhost:3000/posts 
// curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "title=FirstName #1&content=LastName #1" http://localhost:3000/posts 
function createPost(req, res) {
  const { title, content } = req.body;
  const newPosts = { id: getMaxId()+1, title, content, userId: 1, createdAt: new Date(), updatedAt: new Date() };
  posts.push(newPosts);
  res.json(`${newPosts.id}번 포스트가 생성되었습니다.`);
}

// curl -X PUT -H "Content-Type: application/json" -d '{"title":"FirstName #2","content":"LastName #2"}' http://localhost:3000/posts/2
function updatePost(req, res) {
  const id = req.params.id;
  const { title, content } = req.body;
  if (getPostById(id) && !title && !content) {
    throw new Error('수정할 내용이 없습니다.');
  }
  const updatedPost = posts.map((post) => {
    if (post.id === +id) {
      post.title = title ?? post.title;
      post.content = content ?? post.content;
      post.updatedAt = new Date();
    }});
  
  isLenghtChanged = posts.length !== updatedPost.length;
  if (isLenghtChanged) {
    posts = updatedPost;
    res.json(`${id}번 포스트가 수정되었습니다.`);
  } else {
    throw new Error('수정에 실패했습니다.');
  }
}

// curl -X DELETE http://localhost:3000/posts/2
function deletePost(req, res) {
  const id = req.params.id;
  const filteredPost = posts.filter((post) => post.id !== +id);
  const isLenghtChanged = filteredPost.length !== posts.length;
  if (isLenghtChanged) {
    posts = filteredPost;
    res.json('삭제되었습니다.');
  } else {
    throw new Error('삭제에 실패했습니다.');
  }
}

router.post('/', createPost);
router.get('/', getPosts);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

exports.postsRouter = router;