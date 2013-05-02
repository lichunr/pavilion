
var metadata = null;
function Editor(input, content) {
    this.update = function () {
        content.html(marked(input.val()));
        metadata = markdown_meta.parse(input.val());
    };
    input[0].editor = this;
    this.update();
}
new Editor($("#text-input"), $("#content"));

$("#createBlogBtn").on('click', function() {
    if (metadata.seo === undefined || metadata.seo.trim() === "") {
        alert("please input seo");
        return;
    }

    $.ajax({
        url : "/backend/add",
        type: "POST",
        data: {
            md : $("#text-input").val()
        },
        success: function(msg) {
        }
    });
});
