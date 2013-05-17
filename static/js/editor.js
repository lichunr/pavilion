
(function() {
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

$("#saveBlogBtn").on('click', function() {
    var mode = $("#mode").val();

    if (metadata.title === undefined || metadata.title.trim() === "") {
        alert("please input title");
        return;
    }
    if (metadata.seo === undefined || metadata.seo.trim() === "") {
        alert("please input seo");
        return;
    }

    $.ajax({
        url : "/backend/savepost",
        type: "POST",
        data: {
            md : $("#text-input").val(),
            mode: mode
        },
        success: function(msg) {
        }
    });
});
})();
