let page = 1

const getPost = async()=>{
const response = await fetch(`http://newsapi.org/v2/everything?q=bitcoin&from=2020-08-17&sortBy=publishedAt&apiKey=4e630719d22344ef95dca3383b92cf97`)
return response.json()

}

const addPostIntoDOM = async() =>{
    const post = await getPost()
    const PostTemplate = post.map(item=>`<div>${item.status}</div>`)
    console.log(post)

}

addPostIntoDOM()
