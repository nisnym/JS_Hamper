function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide(e) {
  // console.count(e);
  console.log(`window.scrollY: ${window.scrollY}`);
  console.log(`window.innerHeight: ${window.innerHeight}`);
  sliderImages.forEach(sliderImage => {
    // half way through the image
    const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
    console.log(`slideInAt: ${slideInAt}`);

    // bottom of the image
    // `.offsetTop` tells the top of image is how far from the top of the actual window
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    console.log(`imageBottom: ${imageBottom}`);

    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;

    console.log(`isHalfShown: ${isHalfShown}`);
    console.log(`isNotScrolledPast: ${isNotScrolledPast}`);

    if(isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add('active');
    } else {
      sliderImage.classList.remove('active');
    }
  });
}

// window.addEventListener('scroll', checkSlide);
this.addEventListener('scroll', debounce(checkSlide));
