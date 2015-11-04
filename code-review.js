var activeIndex = 0;
$(document).ready(function () {
    //    var carouselItems = [
    //        { src: "images/image01.jpg", title: "Sample 01" },
    //        { src: "images/image02.jpg", title: "Sample 02" },
    //        { src: "images/image03.jpg", title: "Sample 03" },
    //        { src: "images/image04.jpg", title: "Sample 04" },
    //        { src: "images/image05.jpg", title: "Sample 05" }
    //    ];


    var carouselItems = [
        { src: "http://placehold.it/600x300/cccccc/000000", title: "Sample 01" },
        { src: "http://placehold.it/600x300/f45a45/000000", title: "Sample 02" },
        { src: "http://placehold.it/600x300/b78d65/000000", title: "Sample 03" },
        { src: "http://placehold.it/600x300/666aa0/000000", title: "Sample 04" },
        { src: "http://placehold.it/600x300/cccddd/000000", title: "Sample 05" }
    ];

    Carousel = function () {
        // keep track of the current position
        var position = 0;

        // build carousel based on items in the carouselItems array
        $(carouselItems).each(function (index, value) {
            var li = $('<li/>');
            li.addClass('carousel-item');
            li.css('width', 100 / carouselItems.length + '%');
            li.appendTo($('#carousel'));

            var img = $('<img/>');
            img.attr('src', value.src);
            img.attr('title', value.title);
            img.appendTo(li);

            var liDot = $('<li/>');
            liDot.data('position', index); // Store the position of the respectives images & dots
            liDot.data('title', value.title); //Store the image titles on each dot instance
            liDot.addClass('carousel-dots-nav-item').html('o');
            liDot.appendTo($('#carousel-dots-nav'));
        });
        $('#carousel-dots-nav li').eq(activeIndex).addClass('active');
        //increase width of the carousel
        $('#carousel').css('width', carouselItems.length * 100 + '%');

        //add events to dots
        for (i = 0; i < $('.carousel-dots-nav-item').length; i++) {
            var dot = $('.carousel-dots-nav-item')[i];

            // show the title of the image when hovering the associated dot
            $(dot).hover(function (e) {
                //$('#title').text(carouselItems[i].title);
                $('#title').text($(this).data('title'));

            }, function (e) {
                $('#title').text('');
            });

            // move to the appropriate slide when a dot is clicked
            $(dot).click(function (e) {
                //position = i; //i -> $('.carousel-dots-nav-item').length
                var position = $(this).data('position');  //Position based on the index
                $('.active').removeClass('active'); //Reset classes .active from all dots
                $(this).addClass('active'); //Add class .active to clicked dot
                activeIndex = $('#carousel-dots-nav li').index($('#carousel-dots-nav').find('li.active'));
                $('#carousel').animate({
                    left: -activeIndex * 100 + '%'
                }, 500);

            });
        }


        // add click event to next button
        $("#next").click(function (e) {
            e.preventDefault();

            if (activeIndex == carouselItems.length - 1) return;

            $('.active').removeClass('active');
            activeIndex++;

            $('#carousel-dots-nav li').eq((activeIndex)).addClass('active');
            //$('.carousel-dots-nav-item').data('position');

            $('#carousel').animate({
                left: -activeIndex * 100 + '%'
            }, 500);
        });

        // add click event to previous button
        $("#previous").click(function (e) {
            e.preventDefault();

            if (activeIndex == 0) return;
            $('.active').removeClass('active');

            activeIndex--;
            $('#carousel-dots-nav li').eq(activeIndex).addClass('active');
            $('#carousel').animate({
                left: -activeIndex * 100 + '%'
            }, 500);
        });
    };

    var carousel = new Carousel();
});
