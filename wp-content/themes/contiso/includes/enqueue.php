<?php

function ct_enqueue_styles_scripts()
{
  $style = '';
  wp_enqueue_script('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js', array(), time(), true);

  // Page
  if (is_page() || is_single() || is_404() || is_page('blog')) {
    $style = 'page';
    wp_enqueue_script('page', get_template_directory_uri() . '/assets/js/' . $style . '.js', array('bootstrap'), time(), true);
  }

  // Home
  if (is_front_page() || is_page('home')) {
    $style = 'home';
    wp_enqueue_script('home', get_template_directory_uri() . '/assets/js/' . $style . '.js', array('bootstrap'), time(), true);
  }

  // Include style
  if ($style != '') {
    $style_path = get_template_directory_uri() . '/assets/css/' . $style . '.css';

    wp_enqueue_style('current', $style_path, array(), time());
  }

  // Remove jquery
  if (!is_admin()) {
    wp_deregister_script('jquery');
  }

  // Remove support to block editor
  if (!is_single()) {
    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('wp-block-library-theme');
  }
}
add_action('wp_enqueue_scripts', 'ct_enqueue_styles_scripts');
