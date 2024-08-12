<?php
add_action( 'wp_enqueue_scripts', 'fitwear_child_enqueue_styles', 100);
function fitwear_child_enqueue_styles() {
    wp_enqueue_style( 'fitwear-parent', get_theme_file_uri('/style.css') );
}


while ( have_posts() ) :
    the_post();
    the_content();
endwhile;


// add_action( 'user_register', function ( $user_id ) {
//     $userdata = array();
//     echo "<pre>";
//     print_r($_POST['form_data']);
// exit();
  
// } );

function after_user_registration($user_id) {
    $user = new WP_User($user_id);
    //$user->add_role('subscriber');

    if (isset($_POST['form_data'])) {
        $form_data = json_decode(stripslashes($_POST['form_data']), true);
        echo "<pre>";
            print_r($form_data);
            foreach ($form_data as $field) {
            if ($field['field_name'] == 'info_mobile') {
                $mobile_phone = sanitize_text_field($field['value']);
                update_user_meta($user_id, 'info_mobile', $mobile_phone);
            }
             if ($field['field_name'] == 'info_address') {
                $Address = sanitize_text_field($field['value']);
                update_user_meta($user_id, 'info_address', $Address);
            }
             if ($field['field_name']  == 'info_city') {
                $City_user = sanitize_text_field($field['value']);
                update_user_meta($user_id, 'info_city', $City_user);
            }
             if ($field['field_name']  == 'info_country') {
                $Country_user = sanitize_text_field($field['value']);
                update_user_meta($user_id, 'info_country', $Country_user);
            }
             if ($field['field_name']  == 'info_state') {
                $user_state = sanitize_text_field($field['value']);
                update_user_meta($user_id, 'info_state', $user_state);
            }
             if ($field['field_name']  == 'info_postal') {
                $user_postal = sanitize_text_field($field['value']);
                update_user_meta($user_id, 'info_postal', $user_postal);
            }
             if ($field['field_name']  == 'info_gender') {
                $user_gender = sanitize_text_field($field['value']);
                update_user_meta($user_id, 'info_gender', $user_gender);
            }
             if ($field['field_name']  ==  'info_otherinfo') {
                $user_otherinfor = sanitize_text_field($field['value']);
                update_user_meta($user_id, 'info_otherinfo', $user_otherinfor);
            }
             if ($field['field_name']  == 'info_emer_name') {
                $user_Emer_name = sanitize_text_field($field['value']);
                update_user_meta($user_id, 'info_emer_name', $user_Emer_name);
            }
             if ($field['field_name']  == 'info_emer_rel') {
                $user_Emer_rel = sanitize_text_field($field['value']);
                update_user_meta($user_id, 'info_emer_rel', $user_Emer_rel);
            }
            if ($field['field_name']  == 'info_emer_phone') {
                $user_Emer_phone = sanitize_text_field($field['value']);
                update_user_meta($user_id, 'info_emer_phone', $user_Emer_phone);
            }
            if ($field['field_name']  == 'info_emer_email') {
                $user_Emer_email = sanitize_text_field($field['value']);
                update_user_meta($user_id, 'info_emer_email', $user_Emer_email);
            }
        }
        
       
       
    }
   
}
add_action('user_register', 'after_user_registration', 10, 1);


function checkbox_checked() {
   ?>
   <script>
   jQuery( document ).ready(function() {
   jQuery("input[name='subscribe_to_reminders[]']").prop('checked', true);
   jQuery("input[name='bookings[]']").prop('checked', true);
   jQuery("input[name='latestoffers[]']").prop('checked', true);
});
</script>
<?php 
}
add_action( 'wp_footer', 'checkbox_checked' );


add_filter('wp_nav_menu_items', 'wti_loginout_menu_link', 10, 2);

function wti_loginout_menu_link($items, $args)
{
   // echo "<pre>";
   // print_r($args);

    // if ($args->menu == 2)
    // {
       
      $items .= '<li class="login_menu"><script src="https://widgets.mindbodyonline.com/javascripts/healcode.js" type="text/javascript"></script><healcode-widget data-version="0.2" data-link-class="loginRegister" data-site-id="117510" data-mb-site-id="5735695" data-bw-identity-site="true" data-type="account-link" data-inner-html="Login"  /></li>';

          
    //}
    return $items;
}








