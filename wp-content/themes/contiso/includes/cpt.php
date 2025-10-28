<?php

/**
 * Custom post type Services
 */
function ct_post_type_service()
{
  $nomeSingular = 'Serviço';
  $nomePlural = 'Serviços';
  $description = $nomeSingular;

  $labels = array(
    'name' => $nomePlural,
    'singular_name' => $nomeSingular,
    'add_new_item' => "Adicionar novo " . $nomeSingular,
    'edit_item' => 'Editar ' . $nomeSingular,
  );

  $supports = array(
    'title',
    'editor',
    'excerpt',
    'thumbnail'
  );

  $args = array(
    'labels' => $labels,
    'public' => true,
    'description' => $description,
    'menu_icon' => 'dashicons-chart-bar',
    'supports' => $supports,
    'show_in_rest' => true,
  );

  register_post_type('servicos', $args);
}
add_action('init', 'ct_post_type_service');
