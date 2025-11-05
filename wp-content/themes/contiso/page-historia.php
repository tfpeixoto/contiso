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

<?php
require_once('parts/contact.php');
require_once('parts/footer.php');
?>