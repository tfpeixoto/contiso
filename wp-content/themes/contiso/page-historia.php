<?php

/**
 * Template name: História
 */
require_once('parts/header.php');
?>

<main class="page--historia">
  <section class="slider">
    <div class="container slider__container">
      <h1><?php the_title(); ?></h1>
    </div>

    <?php the_post_thumbnail(); ?>
  </section>

  <section class="content">
    <div class="container content__container">
      <?php the_content(); ?>
    </div>
  </section>

  <section class="strategy">
    <div class="container strategy__container">
      <div class="strategy__item">
        <img src="<?= get_template_directory_uri(); ?>/assets/images/icone-parceria.png" alt="#" class="strategy__icon" />
        <h2>Missão</h2>
        <p>Fornecer informações e conhecimentos para que nossos clientes possam utilizar na gestão de suas empresas</p>
      </div>

      <div class="strategy__item">
        <img src="<?= get_template_directory_uri(); ?>/assets/images/icone-parceria.png" alt="#" class="strategy__icon" />
        <h2>Visão</h2>
        <p>Ser reconhecido como um escritório de soluções na gestão geral de um negócio.</p>
      </div>

      <div class="strategy__item">
        <img src="<?= get_template_directory_uri(); ?>/assets/images/icone-parceria.png" alt="#" class="strategy__icon" />
        <h2>Valores</h2>
        <p>Sigilo, ética e transparência. Pratica empatia. Comprometimento</p>
      </div>
    </div>
  </section>

  <?php require_once('parts/contact.php'); ?>
</main>

<?php
require_once('parts/footer.php');
?>