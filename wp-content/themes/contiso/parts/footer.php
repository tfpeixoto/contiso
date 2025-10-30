<footer class="footer">
  <div class="container footer__container">
    <div class="footer__info">
      <div class="footer__info__content">
        <h2>Contiso Contabilidade</h2>
        <p>&copy; <?php the_time('Y'); ?> Contiso Contabilidade Ltda.</p>
      </div>

      <div class="footer__info__social">
        <h2>Siga nossas redes</h2>
        <ul>
          <li><a href="#">Facebook</a></li>
          <li><a href="#">Google+</a></li>
          <li><a href="#">Twitter</a></li>
        </ul>
      </div>
    </div>

    <div class="footer__policy">
      <p>Leia nossa <a href="#">Política de Privacidade</a></p>
    </div>

    <div class="footer__brand">
      <a href="<?= home_url(); ?>"><img src="<?= get_template_directory_uri(); ?>/assets/images/marca-contiso-secondary.png" alt="Marca Contiso Contabilidade" /></a>
    </div>
  </div>

  <div class="container">
    <div class="footer__copy">
      <p>Todos os direitos reservados</p>
    </div>
  </div>
</footer>

<?php wp_footer(); ?>

</body>

</html>