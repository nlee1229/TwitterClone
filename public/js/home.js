// js file that only the home page has
$(document).ready(() => {
    $.get("/api/posts", results => { // ajax request which will send data to the server without having to reload the page
        outputPosts(results, $(".postsContainer"))
    })
})

