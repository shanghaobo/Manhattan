var inputs = document.getElementsByTagName("input");

for (input in inputs) {
    if (inputs[input].type == "text" || inputs[input].type == "file") {
        inputs[input].classList.add("form-control");
        inputs[input].style.width = "100%";
        inputs[input].placeholder = "Say something about this post";
    }
}

$(document).on('submit', '#comment-form', function(e){
    e.preventDefault();
    document.querySelector("#spin").classList.add("spinner");
    var commentUrl = this.attributes['data-comment'].value;
    console.log(commentUrl);

    $.ajax({
        type: 'POST',
        url: commentUrl,
        data: {
            comment:$("#id_comment_text").val(),
            csrfmiddlewaretoken:$("input[name=csrfmiddlewaretoken]").val()
        },
        success: function(response){
            document.querySelector("#spin").classList.remove("spinner");
            newComment(response['user'], response['text'], response['time']);
            document.querySelector("#id_comment_text").value = "";
        },
        error: function(){
            document.querySelector("#spin").classList.remove("spinner");
            commentError("Could not comment. Refresh the page and try again");
        }
    })
});


var count = 0;

function newComment (user, text, time) {
    // section to add new section
    var newCommentSection = document.getElementById("new-comments");

    // new comment section
    var commentDiv = document.createElement("div");
    commentDiv.className = "row comment";        // add a class name
    commentDiv.id = count;            // add an id
    commentDiv.style.display = "none"; // for animation
    
    // image section
    var imageDiv = document.createElement("div");
    imageDiv.className = "col-sm-1";       // size
    imageDiv.id = "user-img";
    var imgSection = document.createElement("img");
    imgSection.src = userImageAddress; // add a source
    imgSection.alt = "image of " + user;  // adds an alternative to the image
    imageDiv.appendChild(imgSection);
    commentDiv.appendChild(imageDiv);

    // top section
    var commentZone = document.createElement("p");
    commentZone.className = "col-sm-11"; // size
    var userPlace = document.createElement("strong");   // bold divs
    var timePlace = document.createElement("strong");   // bold divs
    var topText = document.createTextNode(" Posted ");  // static section
    var userName = document.createTextNode(user);       // username
    userPlace.appendChild(userName);
    var timeValue = document.createTextNode(time);      // time
    timePlace.appendChild(timeValue);
    var lineBreak = document.createElement("br");       // linebreak
    var commentText = document.createTextNode(text);     // the content
    commentZone.appendChild(userPlace);
    commentZone.appendChild(topText);
    commentZone.appendChild(timePlace);
    commentZone.appendChild(lineBreak);
    commentZone.appendChild(commentText);
    commentDiv.appendChild(commentZone);

    // add sec to page
    if (count == 0) {
        // the very first one
        newCommentSection.appendChild(commentDiv);
    } else {
        // other comments that follow
        var b4 = document.getElementById(count-1);
        newCommentSection.insertBefore(commentDiv, b4);
    }
    
    $("#"+count).show(200);

    // Increment count
    count++;
    
    // If no comments existed
    try {
        document.getElementById("no-comments").style.display = "none";
    }
    catch (err) {
        console.log("You are not the first to comment");
    }

    // error message that existed needs to be removed if it exists
    document.getElementById("comment-error").style.display = "none";
}


// error message when ajax comment fails
function commentError (message) {
    var errorDiv = document.getElementById("comment-error");
    errorDiv.innerHTML = message;
    $(errorDiv).show(100);
}

// conver markdown to html
$(document).ready( function () {
    $(".marked-content").each( function () {
        var content = $(this).text();
        var markedContent = marked(content);
        $(this).html(markedContent);
    })
})