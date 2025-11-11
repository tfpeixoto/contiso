<?php

/**
 * Template name: Home
 */
require_once('parts/header.php');
?>

<section class="slider">
  <div class="container slider__container"></div>
  <img src="<?= get_template_directory_uri(); ?>/assets/images/banner.jpg" alt="#" />
</section>

<section class="list list--highlight">
  <div class="container list__container">
    <div class="list__items">
      <div class="item">
        <div class="item__image">
          <img src="<?= get_template_directory_uri(); ?>/assets/images/thumb-historia.png" alt="História Contiso" />
        </div>

        <div class="item__content">
          <h2>Uma trajetória de expertise, compromisso e dedicação.</h2>
          <p>A Contiso é uma empresa especializada em soluções contábeis, fiscais e trabalhistas, oferecendo serviços personalizados para atender às necessidades de cada cliente.</p>
          <a href="#">Clique e saiba mais</a>
        </div>
      </div>

      <div class="item">
        <div class="item__image">
          <img src="<?= get_template_directory_uri(); ?>/assets/images/thumb-diferenciais.png" alt="Diferenciais Contiso" />
        </div>

        <div class="item__content">
          <h2>O próximo nível em Serviços Contábeis</h2>
          <p>A Contiso é uma empresa especializada em soluções contábeis, fiscais e trabalhistas, oferecendo serviços personalizados para atender às necessidades de cada cliente.</p>
          <a href="#">Clique e saiba mais</a>
        </div>
      </div>

      <div class="item">
        <div class="item__image">
          <img src="<?= get_template_directory_uri(); ?>/assets/images/thumb-servicos.png" alt="Serviços Contiso" />
        </div>

        <div class="item__content">
          <h2>Parceiros que acompanham cada detalhe do seu negócio</h2>
          <p>A Contiso é uma empresa especializada em soluções contábeis, fiscais e trabalhistas, oferecendo serviços personalizados para atender às necessidades de cada cliente.</p>
          <a href="#">Clique e saiba mais</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="features">
  <div class="container features__container">
    <div class="features__item">
      <img src="<?= get_template_directory_uri(); ?>/assets/images/icone-parceria.png" alt="Ícone parceria humanizada e customizada" class="features__icon" />
      <h2>Parceria humanizada e customizada</h2>
      <p>Na Contiso, acreditamos que a contabilidade é sobre pessoas. Oferecemos um atendimento próximo e empático, garantindo a confidencialidade e a dedicação que o seu negócio merece. Nossas soluções são totalmente adaptadas à sua realidade, construídas para atender às particularidades da sua empresa.</p>
    </div>

    <div class="features__item">
      <img src="<?= get_template_directory_uri(); ?>/assets/images/icone-inteligencia.png" alt="Ícone parceria humanizada e customizada" class="features__icon" />
      <h2>Inteligência estratégica para decisões conscientes</h2>
      <p>Vamos além dos números para ser um pilar de apoio em sua tomada de decisões. Ao transformar dados financeiros em insights confiáveis, capacitamos sua gestão a traçar caminhos mais seguros e a capitalizar as oportunidades que impulsionam o crescimento e o sucesso.</p>
    </div>

    <div class="features__item">
      <img src="<?= get_template_directory_uri(); ?>/assets/images/icone-agilidade.png" alt="Ícone parceria humanizada e customizada" class="features__icon" />
      <h2>Agilidade operacional e otimização de recursos</h2>
      <p>Com nossa equipe de especialistas, aplicamos metodologias de ponta para otimizar seus processos contábeis. Isso resulta em maior eficiência, eliminação de gastos supérfluos e um ganho significativo de tempo, permitindo que sua equipe se concentre nas atividades centrais do negócio.</p>
    </div>
  </div>
</section>

<section class="showtoo">
  <div class="container showtoo__container">
    <div class="showtoo__title">
      <h2>Conheça também:</h2>
    </div>

    <div class="showtoo__items">
      <div class="showtoo__trainning item">
        <img src="<?= get_template_directory_uri(); ?>/assets/images/thumb-treinamentos.png" alt="Treinamentos Contiso" />
        <div class="item__content">
          <h3>Treinamentos</h3>
          <a href="#">Saiba mais</a>
        </div>
      </div>

      <div class="showtoo__app item">
        <img src="<?= get_template_directory_uri(); ?>/assets/images/thumb-aplicativo.png" alt="Aplicativo Contiso" />
        <div class="item__content">
          <h3>Nosso aplicativo</h3>
          <a href="#">Saiba mais</a>
        </div>
      </div>
    </div>
  </div>
</section>

<?php
require_once('parts/contact.php');
require_once('parts/footer.php');
?>