<?php

/**
 * Template name: História
 */
require_once('parts/header.php');
?>

<section class="slider">
  <div class="container">
    <h1><?php the_title(); ?></h1>
    <img src="#" alt="#" />
  </div>
</section>

<section class="content">
  <div class="container">
    <?php the_content(); ?>
  </div>
</section>

<section class="strategy">
  <div class="container">
    <div class="strategy__item">
      <img src="#" alt="#" class="strategy__icon" />
      <h2>Missão</h2>
      <p>Fornecer informações e conhecimentos para que nossos clientes possam utilizar na gestão de suas empresas</p>
    </div>

    <div class="strategy__item">
      <img src="#" alt="#" class="strategy__icon" />
      <h2>Visão</h2>
      <p>Ser reconhecido como um escritório de soluções na gestão geral de um negócio.</p>
    </div>

    <div class="strategy__item">
      <img src="#" alt="#" class="strategy__icon" />
      <h2>Valores</h2>
      <p>Sigilo, ética e transparência. Pratica empatia. Comprometimento</p>
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