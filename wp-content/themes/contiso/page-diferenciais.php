<?php

/**
 * Template name: Diferenciais
 */
require_once('parts/header.php');
?>

<main class="page--diferenciais">
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

  <?php require_once('parts/contact.php'); ?>
</main>

<?php
require_once('parts/footer.php');
?>