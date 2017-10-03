function headerSearch() {
    var container = $('.js-search');
    if(!container.length)return;
    var input = container.find('input').eq(0);
    var list = container.find('.header__result').eq(0);
    input.focus(function(){
        list.stop().slideDown(200);
    });
    input.blur(function(){
        list.stop().slideUp();
    });
}
function dropdown() {
    $(document).on('click', '.js-dropdown-button', function () {
        var btn = $(this);
        var container = btn.closest('.js-dropdown-container');
        var block = container.find('.js-dropdown-block').eq(0);
        if (btn.hasClass('js-many')){
            block = container.find('.js-dropdown-block-many');
        }

        btn.toggleClass('active');
        if(btn.hasClass('active')){
            block.stop().slideDown(200);
        }else{
            block.stop().slideUp(200);
        }
        $(document).on('click touchstart',function (event){
            if(!btn.hasClass('nomissclick')){
                var ignore = $('.js-ignore-miss-click');
                if (!btn.is(event.target) && btn.has(event.target).length === 0 && !container.is(event.target) && container.has(event.target).length === 0 && !ignore.is(event.target) && ignore.has(event.target).length === 0){
                    btn.removeClass('active');
                    block.stop().slideUp(200);

                }
            }

        });
    })
}
function slidersInit() {
    var slider = $('.js-fade-slider');
    if(slider.length > 0){
        slider.slick({
            dots: false,
            arrows: false,
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: 'linear',
            autoplay: true,
            autoplaySpeed: 5000
        });
        $(document).on('click', '.js-fade-next', function () {
            slider.slick('slickNext');
        });
        $(document).on('click', '.js-fade-prev', function () {
            slider.slick('slickPrev');
        });
    }
    var slider2 = $('.js-sale-slider');
    if(slider2.length > 0){
        slider2.slick({
            dots: false,
            arrows: false,
            infinite: true,
            slidesToShow: 6,
            autoplay: true,
            autoplaySpeed: 2000,
            slidesToScroll: 1,
            responsive: [
                {breakpoint: 1050, settings: {  slidesToShow: 5 } },
                {breakpoint: 890, settings: {  slidesToShow: 4 } },
                {breakpoint: 730, settings: {  slidesToShow: 3 } },
                {breakpoint: 570, settings: {  slidesToShow: 2 } },
                {breakpoint: 481, settings: {  slidesToShow: 1 } },

            ]

        });

        $(document).on('click', '.js-sale-next', function () {
            $(this).closest('section').find('.js-sale-slider').slick('slickNext');
        });
        $(document).on('click', '.js-sale-prev', function () {
            $(this).closest('section').find('.js-sale-slider').slick('slickPrev');
        });
    }
    var slider3 = $('.gallery__slider');
    if(slider3.length > 0){
        slider3.each(function () {
            var that = $(this);
            $(this).slick({
                dots: false,
                arrows: false,
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1
            });
            $(this).on('afterChange', function(event, slick, currentSlide){
                var src = $(this).find('.slick-current').find('img').attr('src');
                $(this).closest('.gallery').find('.gallery__top').find('img').attr('src', src);
            });
            $(this).find('.gallery__slide').on('click', function(){
                var  i = $(this).attr('data-slick-index');
                that.slick('slickGoTo', i);
                that.slick('setPosition');
            });
            $(this).closest('.gallery').find('.jsg-next').on('click', function () {
                that.slick('slickNext');
            });
            $(this).closest('.gallery').find('.jsg-prev').on('click', function () {
                that.slick('slickPrev');
            });
        });
    }
    var slider4 = $('.js-mobile-slider');
    if(slider4.length > 0){
        slider4.slick({
            dots: false,
            arrows: false,
            infinite: true,
            slidesToShow: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            slidesToScroll: 1

        });
        $(document).on('click', '.js-shops-next', function () {
            $(this).closest('.shops__mobile-slider').find('.js-mobile-slider').slick('slickNext');
        });
        $(document).on('click', '.js-shops-prev', function () {
            $(this).closest('.shops__mobile-slider').find('.js-mobile-slider').slick('slickPrev');
        });
    }
}
function startTime() {
    var today = new Date();
    today.setUTCHours(today.getUTCHours() + timeOffset);
    var h = today.getHours();
    var m = today.getMinutes();
    var day = today.getDay();
    var date = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear()
    h = checkTime(h);
    m = checkTime(m);
    date = checkTime(date);
    month = checkTime(month+1);
    checkDay(day);
    $('.js-clock').text(h + ":" + m );
    $('.js-date').text(date + "." + month + "." + year);
    $('.js-day').text(localStorage.currentday);
    var t = setTimeout(startTime,10000);
}
function checkTime(i) {  return i < 10 ? "0"+i : i; }
function clock() {
    var clock = $('.js-clock');
    if(clock.length > 0){ startTime();}
}
function checkDay(i) {
    $.getJSON("response.json", function(json) {
        localStorage.setItem('currentday', json.clock.days[i]);
    });
}

function tabs(){
    var init = $('.js-tab-but.active');
    if (init.length > 0){
        var i = init.index();
        init.closest('.js-tab-container').find('.js-tab-box').eq(i).stop().slideDown();
    }
    $(document).on('click','.js-tab-but', function(){
        if(!$(this).hasClass('active')){
            var ind = $(this).index();
            var tabs = $(this).closest('.js-tab-container').find('.js-tab-but');
            var lists = $(this).closest('.js-tab-container').find('.js-tab-box');
            tabs.removeClass('active');
            lists.stop().slideUp();
            $(this).addClass('active');
            lists.eq(ind).stop().slideDown();
        }

    });
}
function placeholder() {
    var input = $('.js-placeholder');
    if(input.length > 0){
        input.each(function(){
            $(this).focus(function () {
                $(this).next('.placeholder').addClass('hide');
            });
            $(this).blur(function () {
                if($(this).val().length < 1){
                    $(this).next().removeClass('hide');
                }
            });
        });

    }
}
/* scripts for add new item     START*/
function generateRow(){
    var i = 1;
    $(document).on('click', '.js-generate-butt', function () {
        var elem =  $('.js-etalon').clone();
        elem.find('.neworder__trow').addClass('js-one-order-item');
        elem.find('[name *=name]').attr({'required':'required', 'name':'order['+i+'][name]'}).removeClass('etalonn');
        elem.find('input[name *=url]').attr({'required':'required', 'name':'order['+i+'][url]'});
        elem.find('input[name *=count]').attr({'required':'required', 'name':'order['+i+'][count]'});
        elem.find('input[name *=price]').attr({'required':'required', 'name':'order['+i+'][price]'});
        elem.find('input[name *=by]').attr({'required':'required', 'name':'order['+i+'][by]'});
        var html = elem.html();
        $(this).before(html);
        var xstyle = $('.js-select2-init.js-noinit select:not(.etalonn)');
        xstyle.each(function(){
            if(!$(this).hasClass('select2-hidden-accessible')){
                $(this).select2({
                    tags: true,
                    width:'style'
                });
            }
        });
        i++;
        chexkForDelItem();
    });
}
function calculetAllOrders() {
    var items = $('.js-one-order-item');
    if(items.length > 0 ){
        var total = 0;
        items.each(function () {
            var count = parseInt($(this).find('input[name$="[count]"]').val());
            var price = parseFloat(parseFloat($(this).find('input[name$="[price]"]').val()).toFixed(2));
            total += (price*count);
        });
        if(isNaN(total)){total = 0;}
        if(total == 0){
            $('.js-after-calculate').addClass('disabled');
            $('.js-after-calculate input').removeAttr('required');
        }else{
            $('.js-after-calculate').removeClass('disabled');
            $('.js-after-calculate input').attr('required','required');
        }
        $('.js-total-price').text(('$'+total));
        $('.js-total-items-price').text(('$'+total));
        var percent = parseInt($('.js-total-percent').attr('data-percent'));
        var res = (total * percent)/100;
        $('.js-total-percent').text(('$'+res.toFixed(2)));
        $.ajax({
            url : 'ajax.php',
            data: total,
            method:'POST',
            success : function(data){
                console.log(data);
                if ( data.trim() == 'true') {
                    $('.js-total-wraper').addClass('red-true');
                }
                else {
                    $('.js-total-wraper').removeClass('red-true');
                }
            }
        });
    }
}
function inputNumber() {
    $(document).on('click', '.js-number-minus', function () {
        var val = getVal($(this));
        val--;
        val = val < 1 ? 1 : val;
        $(this).closest('.js-input-number').find('input').val(val);
        calculetAllOrders();
    });
    $(document).on('click', '.js-number-plus', function () {
        var val = getVal($(this));
        val++;
        $(this).closest('.js-input-number').find('input').val(val);
        calculetAllOrders();
    });
    function getVal(butt) {
        var val =  parseInt(butt.closest('.js-input-number').find('input').val());
        val = (typeof val == "number" && !isNaN(val)) ? val : 0;
        return val;
    }
    $(document).on('keypress', '.js-input-number', function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) return false;
        return true;
    })
    $(document).on('keypress', 'input[name$="[price]"]', function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) return false;
        return true;
    });
    $(document).on('keyup', 'input[name$="[price]"], input[name$="[count]"]', function () {
        calculetAllOrders();
    })
}
function delItemOrder() {
    $(document).on('click', '.js-delete-item', function () {
        if($(this).hasClass('disabled')) return false;
        $(this).closest('.js-one-order-item').remove();
        chexkForDelItem();
        calculetAllOrders();
    })
}
function chexkForDelItem(){
    var i = $('.js-delete-item').length;
    if(i > 2){
        $('.js-delete-item').removeClass('disabled');
    }else{
        $('.js-delete-item').addClass('disabled');
    }
}
/* scripts for add new item    END*/
function autosumDopService(){
    $(document).on('change', '.js-for-autosum input[type=checkbox]', function () {
        var total = 0;
        $('.js-for-autosum input[type=checkbox]').each(function () {
            if($(this).prop('checked')){
                total += parseInt($(this).closest('.js-for-autosum').find('[data-price]').attr('data-price'));
            }
        });
        $('.js-for-autosum-total').text('$'+total);
    })
}
function styledSelect(){
    var item = $('.js-select-lang');
    if(item.length > 0){
        item.styler({
            selectSmartPositioning:false
        });
    }
    var select = $('.styled__select select:not(.js-order_adres)');
    if (select.length > 0){
        select.styler({
            selectSmartPositioning:false
        });
    }
    var select9 = $('.form_input select');
    if (select9.length > 0){
        select9.styler({
            selectSmartPositioning:false
        });
    }
    var select3 = $('.editinfo__select:not(.js-noinit) select');
    if (select3.length > 0){
        select3.styler({
            selectSmartPositioning:false
        });
    }
    var select4 = $('.styled__select select.js-order_adres');
    if (select4.length > 0){
        select4.styler({
            selectSmartPositioning:false,

            onFormStyled: function () {
               $('.js-order_adres .jq-selectbox__dropdown li[data-name]').each(function () {
                   var text = $(this).attr('data-name');
                       var p = document.createElement('p');
                       $(p).text(text);
                       $(this).prepend(p);
               });
            }
        });

    }
    var select5 = $('.js-select2-init:not(.js-noinit) select');
    if (select5.length > 0){
        select5.select2({
            tags: true,
            width:'style'
        });

    }
}
function trackLogick() {
    $(document).on('keyup', '.js-track-input', function (){
        var input = $(this);
        if($(this).val().length > 0){
            $('.js-track-checkbox').prop('checked', false);
            input.closest('.neworder__desccell').removeClass('disabled');
            input.attr('required', 'required');
        }
    });
    $(document).on('click', '.js-track-checkbox', function () {
        console.log($(this).prop('checked'));
        if($(this).prop('checked') != true){
            $('.js-track-checkbox').prop('checked', false);
            $('.js-track-input').closest('.neworder__desccell').removeClass('disabled');
            $('.js-track-input').attr('required', 'required');
        }else{
            $('.js-track-checkbox').prop('checked', false);
            $(this).prop('checked', true);
            $('.js-track-input').closest('.neworder__desccell').addClass('disabled');
            $('.js-track-input').removeAttr('required');
            $('.js-track-input').val('');

        }
    } );
}
var preloaderFile ='<div class="preloadfile"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="preloadfile__svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="rgb(255,222,0)" stroke-width="5" fill="transparent"    /><circle cx="12" cy="12" r="10"  stroke="rgb(79,82,95)" stroke-width="5" class="preloadfile__circle"/></svg><div class="preloadfile__del"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  width="14px" height="14px"><path fill-rule="evenodd"  fill="rgb(64, 67, 78)" d="M7.000,-0.000 C3.150,-0.000 -0.000,3.150 -0.000,7.000 C-0.000,10.850 3.150,14.000 7.000,14.000 C10.850,14.000 14.000,10.850 14.000,7.000 C14.000,3.150 10.850,-0.000 7.000,-0.000 ZM10.500,9.520 L9.520,10.500 L7.000,7.980 L4.480,10.500 L3.500,9.520 L6.020,7.000 L3.500,4.480 L4.480,3.500 L7.000,6.020 L9.520,3.500 L10.500,4.480 L7.980,7.000 L10.500,9.520 Z"/></svg></div></div>';
function readFile(input) {

    if (input.files && input.files[0]) {
        var nt = document.createElement('input');
        nt.setAttribute("type", "file");
        var index = $(input).closest('.chat__buttons').find('.chat__uploaded').length + 1;
        nt.setAttribute("name", 'files_'+index+'');
        var reader = new FileReader();
        reader.onload = function (e) {
            var fileName = $(input).val().split('/').pop().split('\\').pop();
            var div = document.createElement('div');
            var span = document.createElement('span');
            $(span).text(fileName);
            $(div).addClass('chat__uploaded');
            $(div).append(span);
            var container = $(input).closest('.chat__buttons').find('.chat__file-item');
            $(div).append(preloaderFile);
            $(input).closest('label').prepend(nt);
            $(div).append(input);
            container.prepend(div);
        }
        reader.readAsDataURL(input.files[0]);

    }
}
function readURL(input) {
    if (input.files && input.files[0]) {
        var nt = document.createElement('input');
        nt.setAttribute("type", "file");
        var index = $(input).closest('.neworder__filerow').index() - 1;
        nt.setAttribute("name", 'files['+index+'][]');
        nt.setAttribute("accept", "image/jpeg,image/png,image/gif,application/pdf");
        var reader = new FileReader();
        reader.onload = function (e) {
            var div = document.createElement('div');
            $(div).addClass('neworder__uploaded');
            var img = document.createElement('img');
            $(img).attr('src', e.target.result);
            if(input.files[0].type == "application/pdf"){$(img).attr('src', 'images/pdff.jpg');}
            $(img).attr('data-object-fit','');
            $(div).append(img);
            $(div).append(preloaderFile);
            $(input).closest('.neworder__filerow').find('.neworder__thumbs').append(div);
            $(input).closest('label').prepend(nt);
            $(div).append(input);
        }
        reader.readAsDataURL(input.files[0]);

    }
}
function changeAvatar(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $(input).closest('.editinfo__cell--avatar').find('.editinfo__img img').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);

    }
}
function delFileFromInput() {
    $(document).on('click', '.preloadfile__del', function () {
        $(this).closest('.neworder__uploaded').remove();
        $(this).closest('.chat__uploaded').remove();
    });
}
function lkRadioLogic() {
    var inpt = $('.js-check-for-show');
    if(inpt.length > 0){
        $('.js-check-for-show[checked]').each(function () {
            var val = parseInt($(this).val());
            var container = $(this).closest('.js-for-radio-next').next('.editinfo__change');
            if(val == 0){
                container.html($('.for-tabs-hidden-block .id-card').html());
            }else if(val == 1){
                container.html($('.for-tabs-hidden-block .passport').html());
            }
            var select = container.find('.js-noinit select');
            setTimeout(function () {
                select.styler({
                    selectSmartPositioning:false
                });
            },100);
            var select = container.find('.js-noinit select');
            select.styler({
                selectSmartPositioning:false
            });
        });
        $(document).on('change','.js-check-for-show', function () {
            var val;
            var name = $(this).attr('name');
            var container = $(this).closest('.js-for-radio-next').next('.editinfo__change');
            $('.js-check-for-show[name='+name+']').each(function () {
                if($(this).prop('checked') == true){ val = $(this).val()}
            });
            if(val == 0){
                container.html($('.for-tabs-hidden-block .id-card').html());
            }else if(val == 1){
                container.html($('.for-tabs-hidden-block .passport').html());
            }

            var select = container.find('.js-noinit select');
            select.styler({
                selectSmartPositioning:false
            });


        })
    }
}
function maskedInput(){
    if($('.tel-mask')){  $('.tel-mask').mask('+38(999) 999-99-99 '); }
    if($('.tel-mask-ru')){  $('.tel-mask-ru').mask('+7(999) 999-99-99 '); }
}
function copyToClipboard() {
    $(document).on('click', '.js-cc-btn', function() {
        $('.hiddentext').remove();
        var copyTarget = $(this).closest('div').find('.js-cc-target').text();
        var input = document.createElement('input');
        input.setAttribute('type','text');
        input.setAttribute('class','hiddentext');
        $('.hidden-block').append(input);
        $(input).val(copyTarget);
        input.select();
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    });
}
function showTooltip() {
    var elem = $('.js-show-tooltip');
    if(elem.length > 0){
        $(document).on('mouseenter', '.js-show-tooltip', function () {
            var tip = $(this).find('.tooltip');
            var text = $(this).find('.jq-selectbox__select-text').text();
            tip.text(text);
            tip.css('display','block');
        });
        $(document).on('mouseleave', '.js-show-tooltip', function () {
            var tip = $(this).find('.tooltip');
            tip.css('display','none');
        });
        $(document).on('mouseenter', '.js-show-tooltip .jq-selectbox li', function () {
            var tip = $(this).closest('.js-show-tooltip').find('.tooltip');
            var text = $(this).text();
            tip.text(text);
        });
    }
}
function adresspageRedact() {
    $(document).on('click', '.js-redact-adress', function () {
        var redact = $(this).closest('.adresspage__card').find('.js-redact-block');
        var normal = $(this).closest('.adresspage__card').find('.js-normal-block');
        $('.js-add-card-adres').addClass('disabled');
        $('.adresspage__card--start').stop().slideUp(150);
        redact.stop().slideDown(150);
        normal.stop().slideUp(150);
    })
    $(document).on('click', '.js-cancell-adress', function () {
        var redact = $(this).closest('.adresspage__card').find('.js-redact-block');
        var normal = $(this).closest('.adresspage__card').find('.js-normal-block');
        $('.js-add-card-adres').removeClass('disabled');
        redact.stop().slideUp(150);
        normal.stop().slideDown(150);
    })
    $(document).on('click', '.js-add-card-adres', function () {
        $(this).addClass('disabled');
        $('.adresspage__card--start').stop().slideDown(150);

    });
    $(document).on('click', '.js-cancel-card-adres', function () {
        $('.js-add-card-adres').removeClass('disabled');
        $('.adresspage__card--start').stop().slideUp(150);
    });

}
function allTumblerLogic(){
    $(document).on('change', '.js-all-tumbler input', function (event) {
        event.stopPropagation();
        var prop = $(this).prop('checked');
        var group = $(this).closest('.js-all-tumbler-group').find('.js-switch:not(.js-all-tumbler) input');
        group.each(function () {
            $(this).prop('checked', prop);
        });
    })
}
function showFilter(){
    var btn = $('.js-open-filter');
    var filterWrap = $('.score-date__wrap');

    btn.click(function(){
        filterWrap.slideToggle();
    });
}
function datePick(){
    var dateFormat = "mm/dd/yy",
        from = $( "#js-from" )
            .datepicker({
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 1,
                showOn: "button",
                buttonImage: "images/calendar.svg",
                buttonText: ""
            })
            .on( "change", function() {
                to.datepicker( "option", "minDate", getDate( this ) );
            }),
        to = $( "#js-to" ).datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 1,
            showOn: "button",
            buttonImage: "images/calendar.svg",
            buttonText: ""
        })
            .on( "change", function() {
                from.datepicker( "option", "maxDate", getDate( this ) );
            });

    function getDate( element ) {
        var date;
        try {
            date = $.datepicker.parseDate( dateFormat, element.value );
        } catch( error ) {
            date = null;
        }
        return date;
    }
}
function scrollTo(){
    $('.js-scroll-to').click( function(){ // ловим клик по ссылке с классом go_to
        var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
        if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
            $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500); // анимируем скроолинг к элементу scroll_el
        }
        return false; // выключаем стандартное действие
    });
}
function shops__itemHover(){
    var items = $('.shops__item');
    if(items.length > 0){
        items.each(function () {
            $(this).find('.itemhover').removeClass('itemhover--left');
            var middle = (($(this).parent().width())/2) - 20;
            var posX = $(this).offset().left - $(this).parent().offset().left + (($(this).width())/2);
            if (posX > middle ){
                $(this).find('.itemhover').addClass('itemhover--left');
            }
        });
    }
}
function shops__itemClick() {
    $(document).on('click', '.shops__item', function () {
        var items = $('.shops__item');
        if($(this).hasClass('active')){
            $(this).removeClass('active');
        }else{
            items.removeClass('active');
            $(this).addClass('active');
        }

    });
    $(document).on('click touchstart',function (event){
        var items = $('.shops__item');
        var container = $('.itemhover');
        if (!items.is(event.target) && items.has(event.target).length === 0 && !container.is(event.target) && container.has(event.target).length === 0){
            items.removeClass('active');
        }
    });
}
function shops__popups() {
    $(document).on('click', '[data-popup]', function () {
        var clas = $(this).attr('data-popup');
        $.fancybox.open({
            src  : '.'+clas,
            type : 'inline',
        });
    })
}
function dataToolTips() {
    var items = $('[data-title]');
    if (items.length > 0){
        items.each(function () {
            var text = $(this).attr('data-title');
            var type = $(this).attr('data-title-type');
            var div = document.createElement('div');
            $(div).addClass('tooltip');
            if(type == 'onerow')$(div).addClass('tooltip--onerow');
            $(div).text(text);
            $(this).append(div);
        });
    }
}
function acordeon() {
    var items = $('.jsfaq-accord-butt');
    if (items.length > 0){
        $(document).on('click','.jsfaq-accord-butt', function (e) {

            var container = $(this).closest('.jsfaq-accord');
            var box = container.find('.jsfaq-accord-box');
            if(container.hasClass('active')){
                box.stop().slideUp();
                container.removeClass('active');
            }else{
                $('.jsfaq-accord-box').stop().slideUp();
                $('.jsfaq-accord').removeClass('active');
                container.addClass('active');
                box.stop().slideDown();
            }

            e.preventBubble();

        })
    }
}
function chatScroll() {
    var item = $('.chat__plane');
    if(item.length > 0){
        item.scrollTop(item[0].scrollHeight);
    }

}
var ui = {
    search:function () {
      if($('.mobile__search').css('display') == 'none'){
        $('.header__search-wrap').css('display','block');

      }else if(!$('.mobile__search').hasClass('active')){
          $('.header__search-wrap').css('display','none');
      }
    }

};
function catalogPopups() {
    $(document).on('click', '[data-popup-action]', function(e){
        e.preventDefault();
        var info = $(this).data('popup-action');
        var popup = $('#magaz-pop');
        popup.find('h6').text(info.title);
        popup.find('i').text(info.text);
        popup.find('.datac').text(info.date);
        $.fancybox.open({
            src:"#magaz-pop"
        })
    });
    $(document).on('click', '[data-popup-main]', function(e){
        e.preventDefault();
        var img = $(this).find('.shops__img img').attr('src');
        var info = $(this).data('popup-main');
        var popup = $('#magaz-pop2');
        popup.find('.popmain__img img').attr('src', img);
        popup.find('.pp-total').text(info.total);
        popup.find('.pp-my').text(info.my);
        popup.find('.pp-description').text(info.description);
        var tags = '';
        for(var i=0; i < info.tags.length; i++){
            tags += '<a href="'+info.tags[i].href+'">#'+info.tags[i].title+'</a>'
        }
        popup.find('.pp-tags').html(tags);
        var specs = '';
        for(var i=0; i < info.specs.length; i++){
            specs += '<div class="itemhover__spec-item"><svg><use xlink:href="#'+info.specs[i].id+'"></use></svg><div class="tooltip">'+info.specs[i].text+'</div></div>'
        }
        popup.find('.itemhover__spec-item').remove();
        popup.find('.itemhover__spec').append(specs);

        $.fancybox.open({
            src:"#magaz-pop2"
        })
    });
}
$(document).ready(function () {
    acordeon();
    catalogPopups();
    shops__popups();
    chatScroll();
    $(document).on('change', '.js-input-file input',function(){
        readURL(this);
    });
    $(document).on('change', '.js-input-fileName input',function(){
        readFile(this);
    });
    $(document).on('change', '.js-input-fileAva input',function(){
        changeAvatar(this);
    });
    dataToolTips();
    shops__itemHover();
    shops__itemClick();
    scrollTo();
    datePick();
    showFilter();
    allTumblerLogic();
    adresspageRedact();
    showTooltip();
    copyToClipboard();
    maskedInput();
    delFileFromInput();
    trackLogick()
    lkRadioLogic();
    autosumDopService();
    delItemOrder();
    generateRow();
    placeholder();
    tabs();
    setTimeout(function () {
        styledSelect();
    },100);
    headerSearch();
    dropdown();
    slidersInit();
    clock();
    inputNumber();
});
var myEfficientFn = debounce(function() {
    ui.search();
    shops__itemHover();
}, 250);

window.addEventListener('resize', myEfficientFn);
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

(function(window, document) {
    'use strict';
    var file = 'images/sprite.svg'; // путь к файлу спрайта на сервере

    if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) return true;
    var isLocalStorage = 'localStorage' in window && window['localStorage'] !== null,
        request,
        data,
        insertIT = function() {
            document.body.insertAdjacentHTML('afterbegin', data);
        },
        insert = function() {
            if (document.body) insertIT();
            else document.addEventListener('DOMContentLoaded', insertIT);
        };
    if (isLocalStorage && localStorage.getItem('inlineSVGrev') == revision) {
        data = localStorage.getItem('inlineSVGdata');
        if (data) {
            insert();
            return true;
        }
    }
    try {
        request = new XMLHttpRequest();
        request.open('GET', file, true);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                data = request.responseText;
                insert();
                if (isLocalStorage) {
                    localStorage.setItem('inlineSVGdata', data);
                    localStorage.setItem('inlineSVGrev', revision);
                }

            }
        }
        request.send();
    } catch (e) {}
}(window, document));