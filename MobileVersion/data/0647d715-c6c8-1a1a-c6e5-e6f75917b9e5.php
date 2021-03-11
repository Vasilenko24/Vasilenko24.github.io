<?php
return array (
  'uuid' => '0647d715-c6c8-1a1a-c6e5-e6f75917b9e5',
  'type' => 'contact',
  'recipients' => 'pochta@audiopodarok.ru',
  'subject' => 'Контактная форма',
  'reply' => 'Your message was sent. Thank you.',
  'buttonText' => '    Отправить    ',
  'captchaEnabled' => true,
  'visibilityMode' => 'all',
  'styles' => 
  array (
    'margin' => '5px 0px 70px 0px',
    'padding' => '30px 10px 30px 10px',
    'background' => '',
    'backgroundColor' => 'color4-4',
    'backgroundPosition' => 'top left',
    'backgroundStretch' => 'tile',
    'backgroundOpacity' => '69',
    'borderRadius' => '0 0 0 0',
    'boxShadow' => '0px 0px 10px 5px rgba(0,0,0,0.2)',
    'textColor' => 'inherit',
    'textStroke' => false,
    'linkColor' => 'inherit',
    'linkStroke' => false,
    'h1Color' => 'inherit',
    'h1Stroke' => false,
    'h2Color' => 'inherit',
    'h2Stroke' => false,
  ),
  'fields' => 
  array (
    0 => 
    array (
      'name' => 'name',
      'type' => 'textfield',
      'title' => 'Имя',
      'required' => true,
    ),
    1 => 
    array (
      'name' => 'mail',
      'type' => 'email',
      'title' => 'Электронная почта',
      'required' => true,
    ),
    2 => 
    array (
      'name' => 'message',
      'type' => 'textarea',
      'title' => 'Сообщение',
      'required' => true,
    ),
  ),
  'badCaptcha' => 'Введенный вами текст не совпадает с текстом на картинке.',
  'wrongRequest' => 'Неверный запрос',
  'isPassCaptcha' => false,
  'recaptchaPrivateKey' => '6LcIkNMSAAAAAL_dH5rlWS0XsGfXg9IODumFDHeK',
);
?>