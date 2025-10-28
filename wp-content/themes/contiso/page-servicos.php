<?php

/**
 * Template name: Serviços
 */
require_once('parts/header.php');
?>

<section class="slider">
  <div class="container">
    <h1><?php the_title(); ?></h1>
    <img src="#" alt="#" />
  </div>
</section>

<section class="services">
  <div class="container">
    <div class="services__title">
      <h2>Atualize-se com a contiso: Novidades do setor e da empresa.</h2>
    </div>

    <div class="services__list">
      <?php
      $args = array(
        'post_type' => 'servicos',
        'posts_per_page' => -1
      );
      $services = new WP_Query($args);
      if ($services->have_posts()) : while ($services->have_posts()) : $services->the_post();
      ?>

          <div class="services__item item">
            <div class="item__image">
              <?php the_post_thumbnail(); ?>
            </div>

            <div class="item__content">
              <h2><?php the_title(); ?></h2>
              <p><?php the_excerpt(); ?></p>
              <a href="<?php the_permalink(); ?>">Clique e saiba mais</a>
            </div>
          </div>

        <?php endwhile;
      else: ?>

        <p>Desculpe, não há notícias publicados.</p>

      <?php endif; ?>
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