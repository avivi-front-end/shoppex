function selectStyler(){
   var item = $('.js-select-lang');
   if(item.length > 0){
       item.styler({
           selectSmartPositioning:false
       });
   }
}
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
            var ignore = $('.js-ignore-miss-click');
            if (!btn.is(event.target) && btn.has(event.target).length === 0 && !container.is(event.target) && container.has(event.target).length === 0 && !ignore.is(event.target) && ignore.has(event.target).length === 0){
                btn.removeClass('active');
                block.stop().slideUp(200);
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
            autoplaySpeed: 5000,
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
            slidesToScroll: 1

        });
        $(document).on('click', '.js-sale-next', function () {
            slider2.slick('slickNext');
        });
        $(document).on('click', '.js-sale-prev', function () {
            slider2.slick('slickPrev');
        });
    }
}
function startTime(clock) {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    m = checkTime(m);
    clock.text(h + ":" + m);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}
function clock() {
    var clock = $('.js-clock');
    if(clock.length > 0){ startTime(clock);}
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
            lists.stop().slideUp()
            $(this).addClass('active');
            lists.eq(ind).stop().slideDown();
        }

    });
}
function placeholder() {
    var input = $('.js-placeholder');
    if(input.length > 0){
        input.focus(function () {
            input.next('.placeholder').addClass('hide');
        });
        input.blur(function () {
            if(input.val().length < 1){
                input.next().removeClass('hide');
            }

        });
    }
}
/* scripts for add new item     START*/
function generateRow(){
    var i = 1;
    $(document).on('click', '.js-generate-butt', function () {
        var elem =  $('.js-etalon').clone();
        elem.find('.neworder__trow').addClass('js-one-order-item');
        elem.find('input[name=name]').attr({'required':'required', 'name':'order['+i+'][name]'});
        elem.find('input[name=url]').attr({'required':'required', 'name':'order['+i+'][url]'});
        elem.find('input[name=count]').attr({'required':'required', 'name':'order['+i+'][count]'});
        elem.find('input[name=price]').attr({'required':'required', 'name':'order['+i+'][price]'});
        elem.find('input[name=by]').attr({'required':'required', 'name':'order['+i+'][by]'});
        var html = elem.html();
        $(this).before(html);
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
        var percent = parseInt($('.js-total-percent').attr('data-percent'));
        var res = (total * percent)/100;
        $('.js-total-percent').text(('$'+res.toFixed(2)));
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
    var select = $('.styled__select select');
    if (select.length > 0){
        select.styler({
            selectSmartPositioning:false
        });
    }
    var select2 = $('.form_input select');
    if (select2.length > 0){
        select2.styler({
            selectSmartPositioning:false
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
function readURL(input) {
    var preloader ='<div class="preloadfile"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="preloadfile__svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="rgb(255,222,0)" stroke-width="5" fill="transparent"    /><circle cx="12" cy="12" r="10"  stroke="rgb(79,82,95)" stroke-width="5" class="preloadfile__circle"/></svg><div class="preloadfile__del"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  width="14px" height="14px"><path fill-rule="evenodd"  fill="rgb(64, 67, 78)" d="M7.000,-0.000 C3.150,-0.000 -0.000,3.150 -0.000,7.000 C-0.000,10.850 3.150,14.000 7.000,14.000 C10.850,14.000 14.000,10.850 14.000,7.000 C14.000,3.150 10.850,-0.000 7.000,-0.000 ZM10.500,9.520 L9.520,10.500 L7.000,7.980 L4.480,10.500 L3.500,9.520 L6.020,7.000 L3.500,4.480 L4.480,3.500 L7.000,6.020 L9.520,3.500 L10.500,4.480 L7.980,7.000 L10.500,9.520 Z"/></svg></div></div>'
    if (input.files && input.files[0]) {
        var nt = document.createElement('input');
        nt.setAttribute("type", "file");
        nt.setAttribute("name", "files[]");
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
            $(div).append(preloader);
            $(input).closest('.neworder__filerow').find('.neworder__thumbs').append(div);
            input.before(nt);
            $(div).append(input);
        }
        reader.readAsDataURL(input.files[0]);

    }
}

function delFileFromInput() {
    $(document).on('click', '.preloadfile__del', function () {
        $(this).closest('.neworder__uploaded').remove();
    });
}
$(document).ready(function () {
    $(document).on('change', '.js-input-file input',function(){
        readURL(this);
    });
    delFileFromInput();
    trackLogick()
    styledSelect();
    autosumDopService();
    delItemOrder();
    generateRow();
    placeholder();
    tabs();
    setTimeout(function () {
        selectStyler();
    },100);
    headerSearch();
    dropdown();
    slidersInit();
    clock();
    inputNumber();
});
