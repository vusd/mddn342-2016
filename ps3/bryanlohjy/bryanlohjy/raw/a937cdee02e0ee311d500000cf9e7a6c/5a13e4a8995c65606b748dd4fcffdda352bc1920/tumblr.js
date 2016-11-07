$(document).ready(function (){
  var link = "http://api.tumblr.com/v2/blog/foodgif.tumblr.com/posts?";
  $.ajax({
    type: "GET",
    url : link,
    dataType: "jsonp", 
    data: {
        api_key: "fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4"
    }
  }).done(function( data ) {
    $.each(data.response.posts, function(){
      var _photos = this.photos;
      
      $.each(_photos, function(){
        $('body').append("<img src='" + this.original_size.url + "'/>");
      });
    });
  });
});