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

    <img src="<?= get_template_directory_uri(); ?>/assets/images/banner.jpg" alt="#" />
    <?php // the_post_thumbnail(); 
    ?>
  </section>

  <section class="content">
    <div class="container content__container">
      <?php the_content(); ?>
    </div>
  </section>

  <section class="invest">
    <div class="container">
      <h2>Por que investir em nossos treinamentos</h2>
    </div>
  </section>

  <?php require_once('parts/contact.php'); ?>
</main>

<?php
require_once('parts/footer.php');
?>