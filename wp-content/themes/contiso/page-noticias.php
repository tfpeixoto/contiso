<?php

/**
 * Template name: Notícias
 */
require_once('parts/header.php');
?>

<section class="slider">
  <div class="container slider__container">
    <h1><?php the_title(); ?></h1>
  </div>

  <img src="<?= get_template_directory_uri(); ?>/assets/images/banner.jpg" alt="#" />
</section>

<section class="list list--news">
  <div class="container list__container">
    <div class="list__title">
      <h2>Atualize-se com a contiso: Novidades do setor e da empresa.</h2>
    </div>

    <div class="list__items">
      <?php
      $paged = (get_query_var('paged')) ? get_query_var('paged') : ((get_query_var('page')) ? get_query_var('page') : 1);

      $args = array(
        'post_type' => 'post',
        'posts_per_page' => 3,
        'paged' => $paged
      );
      $news = new WP_Query($args);
      if ($news->have_posts()) : while ($news->have_posts()) : $news->the_post();
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

    <div class="list__nav">
      <div class="list__nav__button nav-previous">
        <?php previous_posts_link('◂', $news->max_num_pages); ?>
      </div>

      <div class="list__nav__button nav-next">
        <?php next_posts_link('▸', $news->max_num_pages); ?>
      </div>
    </div>
  </div>
</section>

<?php
require_once('parts/contact.php');
require_once('parts/footer.php');
?>