document.addEventListener("DOMContentLoaded", function () {
  var scrollButton = document.querySelector(".scroll-to-top");
  var copyButton = document.querySelector(".copy-bibtex-btn");
  var copyText = document.querySelector(".copy-text");
  var bibtexCode = document.getElementById("bibtex-code");

  if (scrollButton) {
    scrollButton.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", function () {
      if (window.scrollY > 360) {
        scrollButton.classList.add("visible");
      } else {
        scrollButton.classList.remove("visible");
      }
    }, { passive: true });
  }

  var videos = Array.prototype.slice.call(document.querySelectorAll("video"));
  if ("IntersectionObserver" in window && videos.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          entry.target.pause();
        }
      });
    }, { threshold: 0.2 });

    videos.forEach(function (video) {
      observer.observe(video);
    });
  }

  if (copyButton && bibtexCode && copyText) {
    copyButton.addEventListener("click", function () {
      var citation = bibtexCode.textContent.trim();
      copyToClipboard(citation).then(function () {
        copyText.textContent = "Copied";
        window.setTimeout(function () {
          copyText.textContent = "Copy";
        }, 1800);
      });
    });
  }
});

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }

  return new Promise(function (resolve) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "absolute";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    resolve();
  });
}
