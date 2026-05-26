const images = [
    "123494760_10100666445335175_269488978486930717_n.jpg",
    "29386865_10100367337918835_6639323371446206464_n.jpg",
    "30714421_10100375326604445_6551514538900979712_n.jpg",
    "31265385_10100376989901185_6994614606748450816_n.jpg",
    "32152278_10100379679511185_6984542852604755968_n.jpg",
    "455166489_10100942404196405_8502518189570376767_n.jpg",
    "459255177_10100951785610975_8095995132597542869_n.jpg",
    "459519578_10100952701231065_8679620815982852337_n.jpg",
    "460063045_10100954340845265_5506806397630757100_n.jpg",
    "460126012_10100953867254345_619610019175948739_n.jpg",
    "460344851_10100954340840275_6953273481471791470_n.jpg",
    "460926347_10100956797961185_1592347101628105840_n.jpg",
    "461482432_10100959827005955_2600054358909833908_n.jpg",
    "461506204_10100959826990985_8980370922290535177_n.jpg",
    "461517779_10100960281310525_144344522745768451_n.jpg",
    "461659619_10100960798983105_7769901043869272780_n.jpg",
    "462365291_10100964715394585_8699623447814416414_n.jpg",
    "463091678_10100970002554075_402122337098474888_n.jpg",
    "463298027_10100970017688745_5509194390683326469_n.jpg",
    "463389393_10100970773319455_9008295078841580521_n.jpg",
    "463481769_10100976905221075_6257423554919984067_n.jpg",
    "463791817_10100975752605925_2985495664623337967_n.jpg",
    "463867545_10100977126767095_4449829649742456537_n.jpg",
    "463881179_10100977126891845_8068686407286583350_n.jpg",
    "463888854_10100974189009385_2367459416420717340_n.jpg",
    "463912069_10100977749623885_5149953932481553762_n.jpg",
    "463956910_10100977749474185_5072744109003164789_n.jpg",
    "463970704_10100977749479175_5877313014028610824_n.jpg",
    "464063799_10100976511944205_7063411349363044617_n.jpg",
    "464080988_10100977749638855_2531367299077732177_n.jpg",
    "464132919_10100977074352135_2586696525667275330_n.jpg",
    "464190510_10100977749509115_6404821846999357105_n.jpg",
    "464216030_10100978898446635_3909096066403111841_n.jpg",
    "464626733_10100982766949125_1314722932926581719_n.jpg",
    "464863807_10100987705961305_2459499516320410106_n.jpg",
    "464932970_10100989812000785_1472740589145917672_n.jpg",
    "464939214_10100998312026665_2413235812240865896_n.jpg",
    "465040422_10100989812160465_112171168786090524_n.jpg",
    "465043655_10100989394692075_4044169875552606295_n.jpg",
    "465177008_10100996291361095_6636918040576230064_n.jpg",
    "465373586_10100996306984785_9065012082147004797_n.jpg",
    "465437837_10101001174475295_2863316230684761306_n.jpg",
    "465696518_10101007748091715_7096619684370934458_n.jpg",
    "465725479_10101005070687255_7700374654810552201_n.jpg",
    "465976617_10101010100367735_3065516963171157567_n.jpg",
    "471078720_10101024296244085_2943157591083202553_n.jpg",
    "471328182_10101024822444575_1239067043667488272_n.jpg",
    "475668304_10101033091009305_1065522352817372956_n.jpg",
    "481082047_10101043422395125_673699577659857953_n.jpg",
    "483894190_10101046017469575_7683595838621668901_n.jpg",
    "486801508_10101051797416515_575043788893335279_n.jpg",
    "488526349_10101055519941545_1242209415423672200_n.jpg",
    "495574817_10101068988345755_3077611971666624975_n.jpg",
    "495594443_10101068988435575_7678568045842039127_n.jpg",
    "495658469_10101068988365715_1700429814755594472_n.jpg",
    "495882736_10101068988375695_6693943801275856451_n.jpg",
    "496223885_10101068988305835_189677979314729919_n.jpg",
    "496479700_10101068988270905_484445687996111474_n.jpg",
    "496726435_10101068988320805_2477429550813140737_n.jpg",
    "67185602_10100521866866585_211481969156947968_n.jpg",
    "67438548_10100521867096125_5436597331585662976_n.jpg",
];

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

images.forEach((src, index) => {

    const imagePath =
        `./assets/images/${src}`;

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
    const response = await fetch(directoryUrl);
    const html = await response.text();

    // Create a temporary element to parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Extract all link hrefs (excluding parent directory links)
    const links = Array.from(doc.querySelectorAll('a'))
        .map(a => a.getAttribute('href'))
        .filter(path => !path.startsWith('..') && !path.startsWith('/'));

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