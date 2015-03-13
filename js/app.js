$(document).ready(function () {

            $("#post-form").on("submit", function (event) {
                event.preventDefault();

                $("#tag").on("submit", function (event) {
                    $('#search').show();
                    $("#tag").hide();
                });

                // Search by tag event handler
                $("#post-form").on("submit", function (event) {

                    $('#results').html('');
                    $(".search").hide();
                    var query = $('#query').val();
                    var count = 30;
                    var client_id = 'df1be7028ee843dcb68036adc5bfc557';
                    var requestParam = {
                        client_id: client_id
                    };

                    function getImages(requestParam) {
                        var url = 'https://api.instagram.com/v1/tags/' + query + '/media/recent?callback=?&count=' + count;

                        $.getJSON(url, requestParam, getResponse);

                    }

                    function animateHover(Object) {
                        $('.hover').mouseover(function () {
                            $(this).addClass("hover_in");
                            $(this).removeClass("hover_out");
                        });
                        $('.hover').mouseout(function () {
                            $(this).addClass("hover_out");
                            $(this).removeClass("hover_in");
                        });
                    }

                    function getResponse(result) {

                        if (result.meta.code == 200) {
                            for (var i = 0; i < result.data.length; i++) {
                                var photos = result.data[i].images.standard_resolution.url;
                                console.log(photos);
                                var from = result.data[i].caption.from.full_name;
                                console.log(from);
                                $('#results').append('<img src="' + photos + '" alt="photo" class="hover">');
                            }

                            animateHover(Object);
                        } else {

                            $('#results').append("Error Occurred");
                        }
                    }

                    getImages(requestParam);

                });

            });