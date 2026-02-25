/* Product Image Gallery + Lightbox */
document.addEventListener('DOMContentLoaded', function () {
  var galleries = document.querySelectorAll('.product-gallery');

  galleries.forEach(function (gallery) {
    var mainImg = gallery.querySelector('.gallery-main img');
    var thumbs = gallery.querySelectorAll('.gallery-thumbs img');

    if (!mainImg || !thumbs.length) return;

    // Thumbnail click → swap main image
    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        mainImg.src = this.dataset.full || this.src;
        mainImg.alt = this.alt;
        thumbs.forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');
      });
    });

    // First thumb active by default
    if (thumbs[0]) thumbs[0].classList.add('active');

    // Lightbox on main image click
    mainImg.addEventListener('click', function () {
      var src = this.src;
      var alt = this.alt;
      var overlay = document.createElement('div');
      overlay.className = 'lightbox-overlay';
      overlay.innerHTML = '<button class="lightbox-close">&times;</button><img src="' + src + '" alt="' + alt + '">';
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';

      function close() {
        overlay.remove();
        document.body.style.overflow = '';
      }

      overlay.addEventListener('click', function (e) {
        if (e.target === overlay || e.target.classList.contains('lightbox-close')) close();
      });
      document.addEventListener('keydown', function handler(e) {
        if (e.key === 'Escape') { close(); document.removeEventListener('keydown', handler); }
      });
    });
  });
});
