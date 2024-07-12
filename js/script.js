const botaoVoltar = document.querySelector('.voltar');
const sectionDetalhesProduto = document.querySelector('.produto__detalhes');
const sectionProdutos = document.querySelector('.produtos');
const sectionHero = document.querySelector('.hero');

const ocutarBotaoESecao = () => {
    botaoVoltar.style.display = 'none';
    sectionDetalhesProduto.style.display = 'none';
};

ocutarBotaoESecao();

const numberFormat = (number) => {
    return number.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
};

const getProducts = async () => {
    const response = await fetch('js/products.json');
    const data = await response.json();
    return data;
};

const generateCard = async () => {
    const products = await getProducts();
    products.map(product => {
        let card = document.createElement('div');
        card.id = product.id;
        card.classList.add('card__produto');
        geraHtmlCards(card, product);
        preencherCard(card, products);
    });
};

generateCard();

botaoVoltar.addEventListener('click', () => {
    sectionProdutos.style.display = 'flex';
    ocutarBotaoESecao();
    resetarSelecao(radios);
});

const preencherDadosProduto = (product) => {
    const images = document.querySelectorAll('.produto__detalhes_imagens figure img');
    const imagesArray = Array.from(images);
    imagesArray.map(image => {
        image.src = `images/${product.image}`;
    });

    document.querySelector('.detalhes span').innerHTML = product.id
    document.querySelector('.detalhes h4').innerHTML = product.product_name;
    document.querySelector('.detalhes h5').innerHTML = product.product_model;
    document.querySelector('.detalhes h6').innerHTML = numberFormat(product.price);
};

const details = document.querySelector('details');

details.addEventListener('toggle', () => {
    const summary = document.querySelector('summary');
    summary.classList.toggle('icone-expandir');
    summary.classList.toggle('icone-recolher');
});

const preencherCard = (card, products) => {
    card.addEventListener('click', (e) => {
        sectionProdutos.style.display = 'none';
        botaoVoltar.style.display = 'grid';
        sectionDetalhesProduto.style.display = 'grid';

        const cardClicado = e.currentTarget;
        const idProduto = cardClicado.id;
        const produtoClicado = products.find(product => product.id == idProduto);

        preencherDadosProduto(produtoClicado);
    });
};

const geraHtmlCards = (card, product) => {
    card.innerHTML = `
        <figure>
            <img src="images/${product.image}" alt="${product.product_name}">
        </figure>
        <div class="card__produto_detalhes">
            <h4>${product.product_name}</h4>
            <h5>${product.product_model}</h5>
        </div>
        <h6>${numberFormat(product.price)}</h6>`;

    const listaProdutos = document.querySelector('.lista__produtos');
    listaProdutos.appendChild(card);
};


const btnCarrinho = document.querySelector('.btn__carrinho .icone');
const sectionCarrinho = document.querySelector('.carrinho');

btnCarrinho.addEventListener('click', () => {
    sectionCarrinho.style.display = 'block';
    sectionHero.style.display = 'none';
    sectionProdutos.style.display = 'none';
    sectionDetalhesProduto.style.display = 'none';
});

const btnHome = document.querySelector('.link_home');
btnHome.addEventListener('click', (event) => {
    event.preventDefault();
    sectionCarrinho.style.display = 'none';
    sectionHero.style.display = 'flex';
    sectionProdutos.style.display = 'flex';
    ocutarBotaoESecao();
});

const radios = document.querySelectorAll('input[type="radio"]')
radios.forEach(radio => {
  radio.addEventListener('change', () => {
    const label = document.querySelector(`label[for="${radio.id}"]`)
    label.classList.add('selecionado')
    console.log(label)
    radios.forEach(radioAtual => {
      if (radioAtual !== radio) {
        const outroLabel = document.querySelector(`label[for="${radioAtual.id}"]`)
        outroLabel.classList.remove('selecionado')
      }
    })
  })
})

const resetarSelecao = (radios) => {
    radios.forEach(radio => {
        radios.forEach(radioAtual => {
            if (radioAtual !== radio) {
                const outroLabel = document.querySelector(`label[for="${radioAtual.id}"]`)
                outroLabel.classList.remove('selecionado')
            }
        })
    })
}

const cart = [];

const btnAddCarrinho = document.querySelector('.btn__add_cart');
btnAddCarrinho.addEventListener('click', () =>{
    const produto = {
        id: document.querySelector('.detalhes span').innerHTML,
        nome: document.querySelector('.detalhes h4').innerHTML,
        modelo: document.querySelector('.detalhes h5').innerHTML,
        preco: document.querySelector('.detalhes h6').innerHTML,
        tamanho: document.querySelector('input[type="radio"][name="size"]:checked').value
    }
    console.log(produto);
    cart.push(produto);
    console.log(cart);

    ocutarBotaoESecao();
    sectionCarrinho.style.display = 'block';
    sectionHero.style.display = 'none';
})


