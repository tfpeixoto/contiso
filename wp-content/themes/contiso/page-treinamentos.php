<?php

/**
 * Template name: Treinamentos
 */
require_once('parts/header.php');
?>

<main class="page--treinamentos">
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

  <section class="invest">
    <div class="container invest__container">
      <div class="invest__content">
        <h2>Por que investir em nossos treinamentos:</h2>
        <p>Favorecem um ambiente corporativo mais integrado e comunicativo.</p>
        <p>Estimulam o desenvolvimento de equipes alinhadas e de alta performance.
        <p>São cuidadosamente elaborados para atender às demandas específicas
          de cada negócio.</p>
      </div>

      <div class="invest__highlight">
        <p>Capacitar pessoas é investir no futuro da sua empresa. Entre em contato conosco e descubra como nossos treinamentos podem transformar a sua equipe.</p>
      </div>
    </div>
  </section>

  <?php require_once('parts/contact.php'); ?>
</main>

<?php
require_once('parts/footer.php');
?>