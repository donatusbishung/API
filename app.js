// console.log('Hello World!')
// const url = "http://worldtimeapi.org/api/timezone/Africa/Lagos";

// async function getTime () {
//     const response = await fetch(url)
//     const time = await response.json()
//     console.log(time)
// }

// getTime()

const postList = document.querySelector('.post-list');
const addForm = document.querySelector('.add-post-form')
const titleValue = document.getElementById('title-value')
const bodyValue = document.getElementById('body-value')
let output = ''

const url = "https://jsonplaceholder.typicode.com/posts"

const renderPost = (posts) => {
    let sliceJson = posts.slice(0, 5)
    let display = sliceJson.map(post => {
        output += `
        <div class="card mt-4 mb-3 mb-sm-0 col-sm-4 bg-light">
            <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">${post.id}</h6>
            <p class="card-text">${post.body}</p>
            <a href="#" class="card-link">Edit</a>
            <a href="#" class="card-link">Delete</a>
            </div>
        </div> `
    })
    postList.innerHTML = output
}


// Get - Read post
// Method: GET
fetch(url)
    // getting the data using json()
    .then(response => {
        // if response is not ok and status is false or above 300 e.g 401, 404
        if(!response.ok)
        {
            console.error(response.json())
        }
        return response.json()
    })
    .then(data => renderPost(data))

// Create - Insert new post
// Method - POST
addForm.addEventListener('submit', (e) => {
    e.preventDefault();

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: titleValue.value,
            body: bodyValue.value
        } )
    })
    .then(res => res.json())
    .then(data => {
        const postArr = []
        postArr.push(data);
        renderPost(postArr)
    })

    // Deleting all inputs after submission
    titleValue.value = '';
    bodyValue.value = '';
})
    
