window.HELP_IMPROVE_VIDEOJS = false;

var SHAPE_INTERP_BASE = "static/data/optim_steps";
var NUM_SHAPE_INTERP_OPTIM_STEPS = 199;

var interp_shape_images_optim_steps = [];


function preloadInterpolationImages() {
    // Shape
    for (var i = 0; i < NUM_SHAPE_INTERP_OPTIM_STEPS; i++) {
        var path = SHAPE_INTERP_BASE + '/' + String(i).padStart(5, '0') + '.jpg';
        console.log(path)
        interp_shape_images_optim_steps[i] = new Image();
        interp_shape_images_optim_steps[i].src = path;
    }
}

// SHAPE - shape to regina
function setInterpolationImageOptimSteps(i) {
    var image = interp_shape_images_optim_steps[i];
    image.ondragstart = function() { return false; };
    image.oncontextmenu = function() { return false; };
    $('#interpolation-image-wrapper-optim-steps').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
        slidesToScroll: 1,
        slidesToShow: 2,
        loop: true,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 3000,
    }

    // Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for (var i = 0; i < carousels.length; i++) {
        // Add listener to  event
        carousels[i].on('before:show', state => {
            console.log(state);
        });
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
        // bulmaCarousel instance is available as element.bulmaCarousel
        element.bulmaCarousel.on('before-show', function(state) {
            console.log(state);
        });
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();


    // Optim
    $('#interpolation-slider-optim-steps').on('input', function(event) {
        setInterpolationImageOptimSteps(this.value);
    });
    setInterpolationImageOptimSteps(0);
    $('#interpolation-slider-optim-steps').prop('max', NUM_SHAPE_INTERP_OPTIM_STEPS - 1);

    bulmaSlider.attach();

})