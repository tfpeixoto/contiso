<?php

/**
 * Template name: Diferenciais
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

<?php
require_once('parts/contact.php');
require_once('parts/footer.php');
?>