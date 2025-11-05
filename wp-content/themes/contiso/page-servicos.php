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

<?php
require_once('parts/contact.php');
require_once('parts/footer.php');
?>