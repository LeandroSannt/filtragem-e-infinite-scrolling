const postsContaiener= document.querySelector("#posts-container")
const loaderContainer = document.querySelector(".loader")
const filterInput =document.querySelector("#filter")

let page = 1

    const getPost = async()=>{
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`)
    return response.json()
    }

const addPostIntoDOM = async() =>{
    const post = await getPost()
    const postsTemplate = post.map(({id, title,body})=>`
        <div class="post">
            <div class="number">${id}</div>
            <div class="post-info">
                <h2 class="post-title">${title}</h2>
                <p class="post-body"> ${body}</p>
            </div>
         </div>
   `).join("")
    postsContaiener.innerHTML += postsTemplate
}

addPostIntoDOM()

const getNextPosts =() =>{
    setTimeout (()=>{
        page++
        addPostIntoDOM()
    },300)
}

const removeLoader= ()=>{
    setTimeout(()=>{
        loaderContainer.classList.remove("show")
    getNextPosts()
    } ,1000)
}

const showLoader = ()=>{
    loaderContainer.classList.add("show")
    removeLoader()
}

window.addEventListener("scroll",()=>{
    const {clientHeight,scrollTop,scrollHeight}= document.documentElement
    const isPageBottomAlmostReached = scrollTop + clientHeight >=scrollHeight -10

    if(isPageBottomAlmostReached){
        showLoader()
    }
})

filterInput.addEventListener("input",(event)=>{
    const inputValue=event.target.value.toLowerCase()
    const posts= document.querySelectorAll(".post")
    posts.forEach(posts=>{

        const postTitle =posts.querySelector(".post-title").textContent.toLowerCase()
        const postBody =posts.querySelector(".post-body").textContent.toLowerCase()
            if(postTitle.includes(inputValue) || postBody.includes(inputValue)){
                posts.style.display="flex"
                return
        }
        posts.style.display="none"
    })
})
