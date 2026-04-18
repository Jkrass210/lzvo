export function initValid() {
  console.log('Form validation module loaded');

  const $ = window.jQuery;
  if (!$) return;

  $('.js-phone-mask').inputmask('+7 999 999-99-99');

  const doc = $(document);

  // =========================
  // ФАЙЛЫ
  // =========================
  doc.on('change', '.js-file', function () {
    const input = this;
    const $input = $(this);
    const $parent = $input.closest('.input-file');

    const allowedExtensions = ['doc', 'docx', 'pdf'];
    const maxSize = 5 * 1024 * 1024;

    const newFiles = Array.from(input.files);
    if (!newFiles.length) return;

    const existingFiles = input._files || [];

    let dt = new DataTransfer();
    let hasError = false;

    const allFiles = [...existingFiles, ...newFiles];

    allFiles.forEach(file => {
      const extension = file.name.split('.').pop().toLowerCase();

      if (!allowedExtensions.includes(extension)) {
        hasError = true;
        return;
      }

      if (file.size > maxSize) {
        hasError = true;
        return;
      }

      dt.items.add(file);
    });

    if (hasError || dt.files.length === 0) {
      $input.addClass('error');
      input.value = '';
      return;
    }

    $input.removeClass('error');

    input.files = dt.files;
    input._files = Array.from(dt.files);

    renderFileList($parent, input);
  });

  function renderFileList($parent, input) {
    $parent.find('.input-file__files').remove();

    const files = Array.from(input.files);
    if (!files.length) return;

    const $filesBlock = $('<div class="input-file__files"></div>');

    files.forEach((file, index) => {
      const $fileItem = $(`
        <div class="input-file__item" data-index="${index}">
          <span class="input-file__name">${file.name}</span>
          <button type="button" class="input-file__remove">
            ✕
          </button>
        </div>
      `);

      $filesBlock.append($fileItem);
    });

    $parent.find('.input-file__wrapp').after($filesBlock);
  }

  doc.on('click', '.input-file__remove', function () {
    const $item = $(this).closest('.input-file__item');
    const indexToRemove = $item.data('index');

    const $parent = $(this).closest('.input-file');
    const input = $parent.find('.js-file')[0];

    let dt = new DataTransfer();
    let files = input._files || [];

    files.forEach((file, index) => {
      if (index !== indexToRemove) {
        dt.items.add(file);
      }
    });

    input.files = dt.files;
    input._files = Array.from(dt.files);

    renderFileList($parent, input);
  });

  // =========================
  // ВАЛИДАЦИЯ
  // =========================
  doc.on('submit', '.js-form', function (e) {
    let errors = 0;
    let form = $(this);
    let requireds = form.find('.required');

    requireds.removeClass('error');

    requireds.each(function (_, input) {
      let $input = $(input);
      let val = $input.val();
      let type = input.type;

      if (type === 'checkbox' && $input.hasClass('required-checkbox')) {
        if (!input.checked) {
          $input.addClass('error');
          errors++;
        }
        return;
      }

      if (type === 'radio' && $input.hasClass('required-radio')) {
        let name = input.name;
        let isChecked = form.find(`input[name="${name}"]:checked`).length > 0;

        if (!isChecked) {
          form.find(`input[name="${name}"]`).addClass('error');
          errors++;
        }
        return;
      }

      if (!val || val.length === 0) {
        $input.addClass('error');
        errors++;
      }

      if ($input.hasClass('required-phone')) {
        let phone = val.replace(/\D+/g, "");
        if (phone.length < 11) {
          $input.addClass('error');
          errors++;
        }
      }

      if ($input.hasClass('required-mail')) {
        let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailReg.test(val)) {
          $input.addClass('error');
          errors++;
        }
      }

      if ($input.hasClass('required-evaluation')) {
        if (!/^[1-5]$/.test(val)) {
          $input.addClass('error');
          errors++;
        }
      }
    });

    // ВАЖНО: не ломаем AJAX
    if (errors > 0) {
      e.preventDefault();
      e.stopImmediatePropagation(); // блокируем любые AJAX-хендлеры не знаю нужно или нет???

      if (typeof BX !== 'undefined') {
        BX.closeWait();
      }
    } else {

      // отправляем форму

      // при успешной отправке в этомже модальном откне есть блок <div class="success-message__window none"> и с него нужно удалить класс "none", а на блок resp-vac__window добавить класс "none" тогда форма скроется а сообщение об отправке высветиться
    }
  });

  // =========================
  // UX
  // =========================
  doc.on('change', '.required-checkbox', function () {
    if (this.checked) $(this).removeClass('error');
  });

  // Снятие ошибки при фокусе
  doc.on('focus', '.required', function () {
    $(this).removeClass('error');
  });

  // Снятие ошибки при вводе
  doc.on('input', '.required', function () {
    $(this).removeClass('error');
  });

  doc.on('change', '.required-radio', function () {
    let name = this.name;
    $(`input[name="${name}"]`).removeClass('error');
  });
}