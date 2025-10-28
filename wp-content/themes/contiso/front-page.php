<?php

/**
 * Template name: Home
 */
require_once('parts/header.php');
?>

<section class="slider">
  <div class="container">
    <img src="#" alt="#" />
  </div>
</section>

<section class="highlight">
  <div class="container">
    <div class="highlight__item item">
      <div class="item__image">
        <img src="#" alt="#" />
      </div>

      <div class="item__content">
        <h2>Uma trajetória de expertise, compromisso e dedicação.</h2>
        <p>A Contiso é uma empresa especializada em soluções contábeis, fiscais e trabalhistas, oferecendo serviços personalizados para atender às necessidades de cada cliente.</p>
        <a href="#">Clique e saiba mais</a>
      </div>
    </div>

    <div class="highlight__item item">
      <div class="item__image">
        <img src="#" alt="#" />
      </div>

      <div class="item__content">
        <h2>O próximo nível em Serviços Contábeis</h2>
        <p>A Contiso é uma empresa especializada em soluções contábeis, fiscais e trabalhistas, oferecendo serviços personalizados para atender às necessidades de cada cliente.</p>
        <a href="#">Clique e saiba mais</a>
      </div>
    </div>

    <div class="highlight__item item">
      <div class="item__image">
        <img src="#" alt="#" />
      </div>

      <div class="item__content">
        <h2>Parceiros que acompanham cada detalhe do seu negócio</h2>
        <p>A Contiso é uma empresa especializada em soluções contábeis, fiscais e trabalhistas, oferecendo serviços personalizados para atender às necessidades de cada cliente.</p>
        <a href="#">Clique e saiba mais</a>
      </div>
    </div>
  </div>
</section>

<section class="features">
  <div class="container">
    <div class="features__item">
      <img src="#" alt="#" class="features__icon" />
      <h2>Parceria humanizada e customizada</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis arcu gravida erat porta, eu feugiat metus dictum. In eget euismod neque. Morbi suscipit tellus orci. Nam consectetur nulla vel leo sollicitudin.</p>
    </div>

    <div class="features__item">
      <img src="#" alt="#" class="features__icon" />
      <h2>Inteligência estratégica para decisões conscientes</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis arcu gravida erat porta, eu feugiat metus dictum. In eget euismod neque. Morbi suscipit tellus orci. Nam consectetur nulla vel leo sollicitudin.</p>
    </div>

    <div class="features__item">
      <img src="#" alt="#" class="features__icon" />
      <h2>Agilidade operacional e otimização de recursos</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis arcu gravida erat porta, eu feugiat metus dictum. In eget euismod neque. Morbi suscipit tellus orci. Nam consectetur nulla vel leo sollicitudin.</p>
    </div>
  </div>
</section>

<section class="showtoo">
  <div class="container">
    <div class="showtoo__title">
      <h2>Conheça também:</h2>
    </div>

    <div class="showtoo__items">
      <div class="showtoo__trainning">
        <img src="#" alt="#" />
        <h2>Treinamentos</h2>
        <a href="#">Saiba mais</a>
      </div>

      <div class="showtoo__app">
        <img src="#" alt="#" />
        <h2>Nosso aplicativo</h2>
        <a href="#">Saiba mais</a>
      </div>
    </div>
  </div>
</section>

<section class="contact">
  <div class="container">
    <div class="contact__form">
      <h2>Contato</h2>
      <p>Ficou com alguma dúvida? Fale com a gente.</p>
      <address>
        <p>Rua Antônio Poli, 676 - Piso Superior - Jardim São Vicente<br />
          Itupeva/SP<br />
          Fone: <a href="tel:+551144965708">(11) 4496-5708</a> / <a href="https://wa.me/5511973739469">(11) 97373-9469</a>
        </p>
      </address>

      <form>
        <div class="form-control">
          <label for="nome">Nome</label>
          <input type="text" name="nome" id="nome" placeholder="Nome" />
        </div>

        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" name="email" id="email" placeholder="Email" />
        </div>

        <div class="form-control">
          <label for="mensagem">Mensagem</label>
          <textarea id="mensagem"></textarea>
        </div>
      </form>
    </div>

    <div class="contact__map">
      Mapa
    </div>
  </div>
</section>

<?php
require_once('parts/footer.php');
?>