const botaoVoltar = document.querySelector('.voltar');
const sectionDetalhesProduto = document.querySelector('.produto__detalhes');
const sectionProdutos = document.querySelector('.produtos');

botaoVoltar.style.display = 'none';
sectionDetalhesProduto.style.display = 'none';

const formatCurrency = (number) => {
    return number.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
};

const getProducts = async () => {
    const response = await fetch('assets/js/products.json');
    const data = await response.json();
    return data;
};

const generateCard = async () => {
    const products = await getProducts();
    products.map(product => {
        let card = document.createElement('div');
        card.id = product.id;
        card.classList.add('card__produto');
        card.innerHTML = `
        <figure>
            <img src="assets/images/${product.image}" alt="${product.product_name}">
        </figure>
        <div class="card__produto_detalhes">
            <h4>${product.product_name}</h4>
            <h5>${product.product_model}</h5>
        </div>
        <h6>${formatCurrency(product.price)}</h6>`;
        const listaProdutos = document.querySelector('.lista__produtos');
        listaProdutos.appendChild(card);

        card.addEventListener('click', (e) => {
            sectionProdutos.style.display = 'none';
            botaoVoltar.style.display = 'grid';
            sectionDetalhesProduto.style.display = 'grid';

            const cardClicado = e.currentTarget;
            const idProduto = cardClicado.id;
            const produtoClicado = products.find(product => product.id == idProduto);

            preencherDadosProduto(produtoClicado);
        })
    });
};

generateCard();

botaoVoltar.addEventListener('click', () => {
    sectionProdutos.style.display = 'flex';
    botaoVoltar.style.display = 'none';
    sectionDetalhesProduto.style.display = 'none';
});

const preencherDadosProduto = (product) => {
    const images = document.querySelectorAll('.produto__detalhes_imagens figure img');
    const imagesArray = Array.from(images);
    imagesArray.map(image => {
        image.src = `./assets/images/${product.image}`;
    });

    document.querySelector('.detalhes h4').innerHTML = product.product_name;
    document.querySelector('.detalhes h5').innerHTML = product.product_model;
    document.querySelector('.detalhes h6').innerHTML = formatCurrency(product.price);
};