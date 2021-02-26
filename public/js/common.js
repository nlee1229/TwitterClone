d// where all the shared code gies and each of the pages can reuse this
$("#postTextarea").keyup(event => {
    var textbox = $(event.target); // every key hit will be targeted
    var value = textbox.val().trim();
    var submitButton = $("#submitPostButton");

    if(submitButton.length == 0) return alert("No submit button found")

    if(value == "") {
        submitButton.prop("disabled", true);  // if value is empty, set disabled property to true (make it disabled)
        return;
    }
    submitButton.prop("disabled", false);  // if value is not empty, make it enabled
})

// handler/submit for the post button press
$("#submitPostButton").click(() => {
    var button = $(event.target);
    var textbox = $("#postTextarea");

    var data = { // configure the data we want to send with this request (post people make)
        content: textbox.val()
    } 

    $.post("/api/posts", data, postData => { // ajax request which will send data to the server without having to reload the page

        var html = createPostHtml(postData);
        $(".postsContainer").prepend(html);
        textbox.val("");
        button.prop("disabled", true); 
    })
})

// this is where posts are listed. Once user makes a post, it will update the list below it.
function createPostHtml(postData) {
    
    var postedBy = postData.postedBy;

    return `<div class='post'>
                <div class='mainContentContainer'>
                    <div class='userImageContainer'>
                        <img src='${postedBy.profilePic}'> 
                    </div>
                    <div class='postContentContainer>
                        <div class='header'>
                        </div>
                        <div class='postBody'>
                        </div>
                        <div class='postFooter'>
                        </div>
                    </div>
                </div>
            </div>`; // you can inject variables into the backticks
}