const data = {
    produtos: [
        {
            id: 1,
            nome: "Base Matte",
            preco: 59.90,
            categoria: "Pele",
            imagem: "./img/base.jpg",
            descricao: "Base matte de alta cobertura e longa duração.",
            emEstoque: true
        },

        {
            id: 2,
            nome: "Pó Solto",
            preco: 39.90,
            categoria: "Pele",
            imagem: "./img/póSolto.jpg",
            descricao: "Pó solto para selagem da maquiagem.",
            emEstoque: true
        },

        {
            id: 3,
            nome: "Pó Compacto",
            preco: 34.90,
            categoria: "Pele",
            imagem: "./img/PóCompacto.jpg",
            descricao: "Pó compacto com acabamento natural.",
            emEstoque: true
        },

        {
            id: 4,
            nome: "Contorno Facial",
            preco: 42.90,
            categoria: "Pele",
            imagem: "./img/contorno.jpg",
            descricao: "Contorno facial para definição do rosto.",
            emEstoque: true
        },

        {
            id: 5,
            nome: "Corretivo Líquido",
            preco: 29.90,
            categoria: "Pele",
            imagem: "./img/corretivo.jpg",
            descricao: "Corretivo líquido de alta cobertura.",
            emEstoque: false
        },

        {
            id: 6,
            nome: "Iluminador Glow",
            preco: 49.90,
            categoria: "Glow",
            imagem: "./img/iluminador.jpg",
            descricao: "Iluminador com brilho intenso.",
            emEstoque: true
        },

        {
            id: 7,
            nome: "Paleta de Sombras",
            preco: 89.90,
            categoria: "Olhos",
            imagem: "./img/PaletaSombra.jpg",
            descricao: "Paleta com cores neutras e vibrantes.",
            emEstoque: true
        },

        {
            id: 8,
            nome: "Blush Rosado",
            preco: 32.90,
            categoria: "Pele",
            imagem: "./img/blush.jpg",
            descricao: "Blush rosado com acabamento suave.",
            emEstoque: true
        }
    ]
};

const productList = document.getElementById("product-list");

const productDetails = document.getElementById("product-details");

const searchInput = document.querySelector("#search");

const categorySelect = document.querySelector("#category");

function formatPrice(preco){

    return `R$ ${preco.toFixed(2)}`;
}

function createProductCard(produto){

    const card = document.createElement("div");

    card.classList.add("card");

    card.setAttribute("data-id", produto.id);

    card.style.backgroundColor = "#ffffff";

    card.innerHTML = `
        <img src="${produto.imagem}">
        <h3>${produto.nome}</h3>
        <p>${formatPrice(produto.preco)}</p>
        <p>${produto.categoria}</p>
    `;

    const btnDetails = document.createElement("button");

    btnDetails.textContent = "Ver detalhes";

    btnDetails.addEventListener("click", () => {

        showProductDetails(produto);
    });

    const btnHighlight = document.createElement("button");

    btnHighlight.textContent = "Destacar";

    btnHighlight.addEventListener("click", () => {

        card.classList.toggle("highlight");
    });

    card.appendChild(btnDetails);

    card.appendChild(btnHighlight);

    return card;
}

function renderProducts(produtos){

    productList.innerHTML = "";

    produtos.forEach(produto => {

        const card = createProductCard(produto);

        productList.appendChild(card);
    });

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        console.log(
            card.getAttribute("data-id")
        );
    });
}

function renderCategories(){

    const categorias = [
        ...new Set(
            data.produtos.map(
                produto => produto.categoria
            )
        )
    ];

    categorias.forEach(categoria => {

        const option = document.createElement("option");

        option.value = categoria;

        option.textContent = categoria;

        categorySelect.appendChild(option);
    });
}

function showProductDetails(produto){

    productDetails.innerHTML = `
        <h2>${produto.nome}</h2>

        <p>
            <strong>Preço:</strong>
            ${formatPrice(produto.preco)}
        </p>

        <p>
            <strong>Categoria:</strong>
            ${produto.categoria}
        </p>

        <p>
            <strong>Estoque:</strong>
            ${produto.emEstoque ? "Disponível" : "Indisponível"}
        </p>

        <p>
            <strong>Descrição:</strong>
            ${produto.descricao}
        </p>
    `;
}

function filterProducts(){

    const textoBusca =
        searchInput.value.toLowerCase();

    const categoriaSelecionada =
        categorySelect.value;

    return data.produtos.filter(produto => {

        const nomeMatch =
            produto.nome
            .toLowerCase()
            .includes(textoBusca);

        const categoriaMatch =
            categoriaSelecionada === "Todas"
            ||
            produto.categoria === categoriaSelecionada;

        return nomeMatch && categoriaMatch;
    });
}

searchInput.addEventListener("input", () => {

    renderProducts(
        filterProducts()
    );
});

categorySelect.addEventListener("change", () => {

    renderProducts(
        filterProducts()
    );
});

document
.getElementById("btnRender")
.addEventListener("click", () => {

    renderProducts(data.produtos);
});

renderCategories();

renderProducts(data.produtos);