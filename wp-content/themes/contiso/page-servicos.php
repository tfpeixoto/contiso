<?php

/**
 * Template name: Serviços
 */
require_once('parts/header.php');
?>

<main class="page--services">
  <section class="slider slider--services">
    <div class="container slider__container">
      <h1><?php the_title(); ?></h1>
    </div>

    <?php the_post_thumbnail(); ?>
  </section>

  <section class="list list--services">
    <div class="container list__container">
      <div class="list__items">
        <?php
        $args = array(
          'post_type' => 'servicos',
          'posts_per_page' => -1
        );
        $services = new WP_Query($args);
        if ($services->have_posts()) : while ($services->have_posts()) : $services->the_post();
        ?>

            <div class="list__item item">
              <div class="item__image">
                <?php the_post_thumbnail(); ?>
              </div>

              <div class="item__content">
                <h2><?php the_title(); ?></h2>
                <?php the_excerpt(); ?>
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

  <?php require_once('parts/contact.php'); ?>
</main>

<?php
require_once('parts/footer.php');
?>