// js file that only the home page has
$(document).ready(() => {
    $.get("/api/posts", results => { // ajax request which will send data to the server without having to reload the page
        outputPosts(results, $(".postsContainer"))
    })
})

function outputPosts(results, container) {
    container.html(""); // clear the container so there's nothing in there

    results.forEach(result => { // loop over results and output it
        var html = createPostHtml(result); // get html
        container.append(html); // append to the container
    });

    if(results.length == 0) { // check to see if there are no results
        container.append("<span class='noResults'>Nothing to show.</span>")
    }
}