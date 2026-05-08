/* --- INSTÄLLNINGAR FÖR VECKANS VARA --- */
const weeklyItem = {
    title: "Veckans Fynd: Gröna Skålar",
    description: "Ett set om tre matchande skålar i olika storlekar.",
    price: "Alla 3 för 100 kr",
    image: "images/Skålar.jpg" 
};

/* --- FUNKTION FÖR ATT UPPDATERA SIDAN --- */
function updateWeeklyItem() {
    // Listan på alla ID:n vi behöver uppdatera (både mobil och desktop)
    const suffixes = ['-desktop', '-mobile'];

    suffixes.forEach(suffix => {
        const titleEl = document.getElementById('weekly-item-title' + suffix);
        const descEl = document.getElementById('weekly-item-desc' + suffix);
        const priceEl = document.getElementById('weekly-item-price' + suffix);
        const imgEl = document.getElementById('weekly-item-img' + suffix);

        if (titleEl && descEl && priceEl && imgEl) {
            titleEl.textContent = weeklyItem.title;
            descEl.textContent = weeklyItem.description;
            priceEl.textContent = weeklyItem.price;
            imgEl.src = weeklyItem.image;
            imgEl.alt = weeklyItem.title;
        }
    });
}

// Denna rad ser till att funktionen körs så fort fönstret laddats
window.onload = updateWeeklyItem;





/* Galleri           */
const images = [
    {src: 'images/Vitblomma.jpg', alt: 'Vitblomma på ett träd'},
    {src: 'images/Rosablomma.jpg', alt: 'Rosa och vita blommor'},
    {src: 'images/Fruktträdvit.jpg', alt: 'Fruktträd med vita blommor'},
    {src: 'images/Lilablomma.jpg', alt: 'Lila blommor'},
    {src: 'images/Finaform.jpg', alt: 'Keramik från Finaform' },
    {src: 'images/Fruktträd.jpg', alt: 'Fruktträd för plantering' },
    {src: 'images/Plåtrosor.jpg', alt: 'Plåtrosor gjorda av Emelie' },
    {src: 'images/Lyktor.png', alt: 'Olika typer av lyktor'},
    {src: 'images/Ljus.png', alt: 'Polckarandiga ljus'},
    {src: 'images/Artikel.jpg', alt: 'Artikel från tidningen'},
    {src: 'images/Rödaljus.jpg', alt: 'Rödrandiga ljus'},
    {src: 'images/Skålar.jpg', alt: 'Gröna räfflade skålar'}
   
];

const galleryContainer = document.getElementById('gallery-container');
let currentImageIndex = 0; // Håller koll på vilken bild som är öppen

function displayImages() {
    if (!galleryContainer) return;
    galleryContainer.innerHTML = "";

    images.forEach(image => {
        const imageCard = `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="gallery-item" onclick="openLightbox('${image.src}')">
                    <img src="${image.src}" alt="${image.alt}" class="img-fluid rounded shadow-sm">
                </div>
            </div>
        `;
        galleryContainer.innerHTML += imageCard;
    });
}

// Öppnar modalen och hittar rätt start-index
function openLightbox(src) {
    currentImageIndex = images.findIndex(img => img.src === src);
    updateModalContent();

    const modalElement = document.getElementById('galleryModal');
    const myModal = bootstrap.Modal.getOrCreateInstance(modalElement);
    myModal.show();
}

// Byter bild (direction är 1 eller -1)
function changeImage(direction) {
    currentImageIndex += direction;

    if (currentImageIndex >= images.length) {
        currentImageIndex = 0; // Gå till början
    } else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1; // Gå till slutet
    }

    updateModalContent();
}

// Uppdaterar bilden inuti modalen
function updateModalContent() {
    const modalImage = document.getElementById('modalImage');
    if (modalImage) {
        modalImage.src = images[currentImageIndex].src;
        modalImage.alt = images[currentImageIndex].alt;
    }
}

if (galleryContainer) {
    displayImages();
}

/* Karta         */
const mapContainer = document.getElementById('map');
if (mapContainer) {
    // ... (behåll din nuvarande kart-kod här, den ser bra ut!)
    const lat = 57.984474;
    const lng = 12.740857;
    const map = L.map('map').setView([lat, lng], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);
    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup("<b>Lillannas Butik</b><br>Välkommen in!").openPopup();
    
    mapContainer.addEventListener('click', function() {
        window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
    });
    setTimeout(() => { map.invalidateSize(); }, 200);
}