const images =
    await getFilePaths(
        "./assets/images/"
    );

const carouselInner =
    document.getElementById("carouselInner");

const thumbs =
    document.getElementById("thumbs");

const carouselElement =
    document.getElementById("imageCarousel");

const autoScrollCheckbox =
    document.getElementById(
        "autoScrollCheckbox"
    );

images.forEach((imagePath, index) => {

    // MAIN IMAGE

    const item =
        document.createElement("div");

    item.className =
        "carousel-item" +
        (index === 0 ? " active" : "");

    item.innerHTML = `
        <img src="${imagePath}"
             class="d-block w-100"
             alt="Image ${index + 1}">

        <div class="image-path">
            ${imagePath}
        </div>
    `;

    carouselInner.appendChild(item);

    // THUMBNAIL

    const thumb =
        document.createElement("img");

    thumb.src = imagePath;

    thumb.className =
        index === 0 ? "active" : "";

    thumb.onclick = () => {

        carousel.to(index);
    };

    thumbs.appendChild(thumb);
});

async function getFilePaths(directoryUrl) {

    const response =
        await fetch(directoryUrl);

    const html =
        await response.text();

    const parser =
        new DOMParser();

    const doc =
        parser.parseFromString(
            html,
            "text/html"
        );

    const links =
        Array.from(doc.querySelectorAll("a"))

            .map(a => a.getAttribute("href"))

            .filter(path => {

                return /\.(png|jpg|jpeg|gif|webp)$/i
                    .test(path);
            });

    return links;
}

// THUMBNAIL ACTIVE STATE

carouselElement.addEventListener(
    "slide.bs.carousel",
    event => {

        document
            .querySelectorAll(".thumbs img")
            .forEach((img, index) => {

                img.classList.toggle(
                    "active",
                    index === event.to
                );
            });
    }
);

// CREATE CAROUSEL

const carousel =
    new bootstrap.Carousel(
        carouselElement,
        {
            interval: 5000,
            ride: "carousel",
            wrap: true,
            pause: false
        }
    );

// AUTO SCROLL CHECKBOX

autoScrollCheckbox.addEventListener(
    "change",
    () => {

        if (autoScrollCheckbox.checked) {

            carousel.cycle();

        } else {

            carousel.pause();
        }
    }
);

// START ENABLED

carousel.cycle();