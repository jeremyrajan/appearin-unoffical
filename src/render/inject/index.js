// inject jQuery first
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);
const itemsToHide = ['.section', '.main-nav', '.pitch p:eq(1)', '.contacts-button', '.video-space-header:eq(0) .content-wrapper:eq(0) div:eq(0)', 'room-activity:eq(0)', '.user-settings-modal:eq(0) .tab-select-button-group:eq(0) div:eq(0)'];

// after we have injected lovely JS, lets start doing stuff!!
setTimeout(() => {
  itemsToHide.forEach((i) => $(i).hide());
  $('.room-wrapper').change(() => {
    $('.login-modal-button').css('margin-right', '125px');
    $('.login-modal-button').css('margin-top', '5px');
    $('.login-modal-button').css('color', 'grey');
  });

  $('.wrapper').bind('DOMSubtreeModified', (e) => {
    if (!e.target.innerHTML.length > 0) return;
    itemsToHide.forEach((i) => $(i).hide());
  });

  // autosave roomname to config
  if ($('.url-bar').length > 0) {
    $('input[type=submit]').click((e) => {
      const roomName = $('form.url-bar').find('#room-name').attr('placeholder');
      localStorage.setItem('roomName', roomName);
      e.preventDefault();
      return false;
    });
  }
}, 500);
