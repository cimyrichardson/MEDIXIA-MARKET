document.addEventListener("DOMContentLoaded", function () {
    // ===============================
    // MENU MOBILE
    // ===============================
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");
    if (navToggle && navLinks) {
        navToggle.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("open");
            navToggle.setAttribute("aria-expanded", isOpen.toString());
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // ===============================
    // CHARGEMENT DYNAMIQUE DES PRODUITS
    // ===============================
    async function loadProducts() {
        const container = document.querySelector("#products-container");
        if (!container) return;

        const fallbackProducts = [
            {
                img: "https://via.placeholder.com/400x300.png?text=Tensiomètre+Manuel",
                nom: "Tensiomètre Manuel",
                categorie: "Matériel Médical",
                description: "Appareil manuel pour mesurer la pression artérielle avec précision.",
                prix: "49,99 €"
            },
            {
                img: "https://via.placeholder.com/400x300.png?text=Tensiomètre+Electronique",
                nom: "Tensiomètre Electronique",
                categorie: "Matériel Médical",
                description: "Mesure automatique de la tension artérielle en quelques secondes.",
                prix: "79,99 €"
            },
            {
                img: "https://via.placeholder.com/400x300.png?text=Oxymètre",
                nom: "Oxymètre",
                categorie: "Matériel Médical",
                description: "Mesure la saturation en oxygène du sang et le pouls.",
                prix: "34,50 €"
            },
            {
                img: "https://via.placeholder.com/400x300.png?text=Penlight+Médical",
                nom: "Penlight Médical",
                categorie: "Accessoires Médicaux",
                description: "Lampe compacte pour les examens médicaux de précision.",
                prix: "12,00 €"
            },
            {
                img: "https://via.placeholder.com/400x300.png?text=Stéthoscope+Double+Foyer",
                nom: "Stéthoscope Double Foyer",
                categorie: "Accessoires Médicaux",
                description: "Instrument professionnel pour écouter les sons du cœur et des poumons.",
                prix: "89,90 €"
            },
            {
                img: "https://via.placeholder.com/400x300.png?text=Glucomètre+Complet",
                nom: "Glucomètre Complet",
                categorie: "Équipements Médicaux",
                description: "Kit complet pour mesurer la glycémie avec résultats rapides.",
                prix: "69,90 €"
            },
            {
                img: "https://via.placeholder.com/400x300.png?text=Blouse+Manche+Longue",
                nom: "Blouse Manche Longue",
                categorie: "Vêtements Professionnels",
                description: "Blouse médicale confortable et résistante pour usage quotidien.",
                prix: "39,99 €"
            },
            {
                img: "https://via.placeholder.com/400x300.png?text=Blouse+Manche+Courte",
                nom: "Blouse Manche Courte",
                categorie: "Vêtements Professionnels",
                description: "Blouse légère idéale pour le travail en environnement médical.",
                prix: "35,99 €"
            },
            {
                img: "https://via.placeholder.com/400x300.png?text=Lunettes+Anti-Bleu",
                nom: "Lunettes Anti-Bleu",
                categorie: "Accessoires Médicaux",
                description: "Protection des yeux contre la lumière bleue et la fatigue visuelle.",
                prix: "24,50 €"
            },
            {
                img: "https://via.placeholder.com/400x300.png?text=Bottines+Infirmières",
                nom: "Bottines Infirmières",
                categorie: "Vêtements Professionnels",
                description: "Chaussures de travail confortables et antidérapantes.",
                prix: "59,90 €"
            },
            {
                img: "https://via.placeholder.com/400x300.png?text=Thermomètre+Digital",
                nom: "Thermomètre Digital",
                categorie: "Consommables Médicaux",
                description: "Thermomètre rapide et précis pour usage quotidien.",
                prix: "15,90 €"
            },
            {
                img: "https://via.placeholder.com/400x300.png?text=Masque+Chirurgical",
                nom: "Masque Chirurgical",
                categorie: "Consommables Médicaux",
                description: "Lot de masques pour la protection en milieu médical.",
                prix: "9,99 €"
            }
        ];

        try {
            const response = await fetch("produits.json");
            if (!response.ok) {
                throw new Error("Impossible de charger les données des produits.");
            }

            const products = await response.json();
            if (!Array.isArray(products) || products.length === 0) {
                container.innerHTML = "<p class='error'>Aucun produit disponible pour le moment.</p>";
                return;
            }

            renderProducts(products);
        } catch (error) {
            renderProducts(fallbackProducts, true);
        }
    }

    function renderProducts(products, fallback = false) {
        const container = document.querySelector("#products-container");
        if (!container) return;

        container.innerHTML = fallback ? "<p class='error'>Impossible de charger le JSON, affichage depuis le repli local.</p>" : "";

        const categories = [...new Set(products.map(product => product.categorie))];
        container.innerHTML += categories.map(category => {
            const cards = products
                .filter(product => product.categorie === category)
                .map(product => `
                    <article class="card">
                        <img src="${product.img}" alt="${product.nom}">
                        <div class="product-meta">
                            <p class="category">${product.categorie}</p>
                            <h3>${product.nom}</h3>
                            <p>${product.description}</p>
                            <p class="price">${product.prix}</p>
                        </div>
                    </article>
                `).join("");

            return `
                <section class="product-section">
                    <h2>${category}</h2>
                    <div class="products">${cards}</div>
                </section>
            `;
        }).join("");

        animateCards();
        appearOnScroll();
    }

    function animateCards() {
        const cards = document.querySelectorAll(".card");
        cards.forEach(card => {
            card.style.transition = "transform 0.3s, box-shadow 0.3s";
            card.addEventListener("mouseover", () => {
                card.style.transform = "scale(1.07)";
                card.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
            });
            card.addEventListener("mouseout", () => {
                card.style.transform = "scale(1)";
                card.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
            });
        });
    }

    loadProducts();

    // ===============================
    // FORMULAIRE
    // ===============================
    const form = document.querySelector("form");
    if (form) {
        const inputs = form.querySelectorAll("input, textarea");
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            let valide = true;
            inputs.forEach(input => input.style.borderColor = "#ccc");

            const nom = form.querySelector("input[type='text']").value.trim();
            const email = form.querySelector("input[type='email']").value.trim();
            const message = form.querySelector("textarea").value.trim();

            if (nom === "") {
                form.querySelector("input[type='text']").style.borderColor = "red";
                valide = false;
            }
            if (email === "" || !email.includes("@")) {
                form.querySelector("input[type='email']").style.borderColor = "red";
                valide = false;
            }
            if (message === "") {
                form.querySelector("textarea").style.borderColor = "red";
                valide = false;
            }

            if (!valide) {
                alert("Veuillez remplir correctement tous les champs !");
                return;
            }

            alert("Message envoyé !");
            form.reset();
        });

        inputs.forEach(input => {
            input.addEventListener("focus", () => input.style.borderColor = "#1aa36f");
            input.addEventListener("blur", () => input.style.borderColor = "#ccc");
        });
    }

    // ===============================
    // BOUTON HAUT DE PAGE
    // ===============================
    const btnTop = document.createElement("button");
    btnTop.className = "back-to-top";
    btnTop.setAttribute("aria-label", "Remonter en haut");
    btnTop.innerHTML = "↑";
    document.body.appendChild(btnTop);

    window.addEventListener("scroll", () => {
        btnTop.classList.toggle("show", window.scrollY > 200);
    });

    btnTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // ===============================
    // LIENS DU MENU - EFFET HOVER
    // ===============================
    const navLinksAnimated = document.querySelectorAll("nav a");
    navLinksAnimated.forEach(link => {
        link.style.transition = "color 0.3s, transform 0.2s";
        link.addEventListener("mouseover", () => link.style.transform = "scale(1.1)");
        link.addEventListener("mouseout", () => link.style.transform = "scale(1)");
    });

    // ===============================
    // EFFET D'APPARITION AU SCROLL
    // ===============================
    const sections = document.querySelectorAll("section, .container");
    sections.forEach(sec => {
        sec.style.opacity = 0;
        sec.style.transition = "opacity 1s ease-out, transform 1s ease-out";
        sec.style.transform = "translateY(30px)";
    });

    function appearOnScroll() {
        const windowBottom = window.innerHeight + window.scrollY;
        sections.forEach(sec => {
            if (windowBottom > sec.offsetTop + 50) {
                sec.style.opacity = 1;
                sec.style.transform = "translateY(0)";
            }
        });
    }

    window.addEventListener("scroll", appearOnScroll);
    appearOnScroll();
});
