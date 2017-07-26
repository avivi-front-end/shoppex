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
function generateRow(){
        $(document).on('click', '.js-generate-butt', function () {
            var i = $('.js-one-order-item').length;
            var html =  '<div class="lk-card__trow neworder__trow js-one-order-item"><div class="neworder__tcell"><div class="neworder__input">'+
                '<input type="text" placeholder="Введите товар" name="order['+i+'][name]" required="required">'+
                '</div></div><div class="neworder__tcell neworder__tcell--url"><div class="neworder__input">'+
                '<input type="text" placeholder="Введите ссылку" name="order['+i+'][url]" required="required">'+
                '</div></div><div class="neworder__tcell neworder__tcell--count"><div class="neworder__input neworder__input--center">'+
                '<input type="text" placeholder="" name="order['+i+'][count]" required="required">'+
                '</div></div><div class="neworder__tcell neworder__tcell--price"><div class="neworder__input neworder__input--center">'+
                '<input type="text" placeholder="" name="order['+i+'][price]" required="required">'+
                '</div></div><div class="neworder__tcell neworder__tcell--by"><label class="styled">'+
                '<input type="checkbox" name="order['+i+'][by]"><i></i>'+
                '</label></div></div>';
            $(this).before(html);
        });
}
function calculetAllOrders() {
    var items = $('.js-one-order-item');
    if(items.length > 0 ){
        var total = 0;
        items.each(function () {
            var count = parseInt($(this).find('input[attr$="count"]').val());
        });
    }
}
function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}
$("#imgInp").change(function(){
    readURL(this);
});

$(document).ready(function () {
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

});
