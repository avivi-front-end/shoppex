
var validationMessages = {
    email:{required: "Вы пропустили", maxlength: "превышает 72", email:"невалидный почта", remote:"ответочка от бека"},
    password:{required: "Вы пропустили", minlength: "минимум 6", maxlength: "превышает 72",},
    repassword:{required: "Вы пропустили",equalTo:"пароли не совпадают.", minlength: "минимум 6", maxlength: "превышает 72",},
    agree:{required: "Вы пропустили"},
    namecyr:{required: "Вы пропустили",nameCyr:"что то не так!", minlength: "минимум 2", maxlength: "превышает 72", },
    surnamecyr:{required: "Вы пропустили", nameCyr:"что то не так!", minlength: "минимум 2", maxlength: "превышает 72", },
    secnamecyr:{required: "Вы пропустили", nameCyr:"что то не так!", minlength: "минимум 2", maxlength: "превышает 72", },
    namelat:{required: "Вы пропустили",nameLat:"что то не так!", minlength: "минимум 2", maxlength: "превышает 72", },
    surnamelat:{required: "Вы пропустили", nameLat:"что то не так!", minlength: "минимум 2", maxlength: "превышает 72", },
    secnamelat:{required: "Вы пропустили", nameLat:"что то не так!", minlength: "минимум 2", maxlength: "превышает 72", },
    phoneua:{required: "Вы пропустили", phoneua:"Не валиднй номер"},
    index:{required: "Вы пропустили", number:"Только цифри",minlength: "минимум 5", maxlength: "превышает 5" },
    region:{required: "Вы пропустили",nameCyr:"что то не так!", minlength: "минимум 2", maxlength: "превышает 64" },
    city:{required: "Вы пропустили",nameCyr:"что то не так!", minlength: "минимум 2", maxlength: "превышает 64" },
    street:{required: "Вы пропустили",nameCyr:"что то не так!", minlength: "минимум 2", maxlength: "превышает 64" },
    district:{nameCyr:"Вы пропустили", minlength: "минимум 2", maxlength: "превышает 64"},
    house:{required: "Вы пропустили", house:"что то не так!", maxlength: "превышает 8" },
    corpus:{ house:"что то не так!", maxlength: "превышает 6" },
    flat:{required: "Вы пропустили", number:"Только цифри", minlength: "минимум 1", maxlength: "превышает 3"},
    passport:{required: "Вы пропустили", passport:"неправильная серия", minlength: "минимум 2", maxlength: "превышает 2"},
    passnum:{required: "Вы пропустили", number:"Только цифри",minlength: "минимум 6", maxlength: "превышает 6" },
    inn:{required: "Вы пропустили", number:"Только цифри",minlength: "минимум 10", maxlength: "превышает 10" },
    idnum:{required: "Вы пропустили", number:"Только цифри",minlength: "минимум 9", maxlength: "превышает 9" },
    iddescr:{required: "Вы пропустили", iddescr:"Только цифри и дефис",minlength: "минимум 5", maxlength: "превышает 20" },
    whogive:{required: "Вы пропустили",nameCyr:"что то не так!", minlength: "минимум 5", maxlength: "превышает 100" },
    bdday:{require_from_group:"Вы пропустили", birthday:"где твои 18 лет?"},
    bdmonth:{require_from_group:"Вы пропустили", birthday: "где твои 18 лет?"},
    bdyear:{require_from_group:"Вы пропустили", birthday: "где твои 18 лет?"},
    passday:{require_from_group:"Вы пропустили", checkbd:"не мог ты получить его до 16!"},
    passmonth:{require_from_group:"Вы пропустили", checkbd:"не мог ты получить его до 16!"},
    passyear:{require_from_group:"Вы пропустили", checkbd:"не мог ты получить его до 16!"},
    cardsday:{require_from_group:"Вы пропустили", checkbd14:"не мог ты получить его до 14!"},
    cardsmonth:{require_from_group:"Вы пропустили", checkbd14:"не мог ты получить его до 14!"},
    cardsyear:{require_from_group:"Вы пропустили", checkbd14:"не мог ты получить его до 14!"},
    oldsday:{require_from_group:"Вы пропустили", checkold:"Действительна до  Карта заканчивает свое действие ровно через десять лет"},
    oldsmonth:{require_from_group:"Вы пропустили", checkold: "Действительна до  Карта заканчивает свое действие ровно через десять лет"},
    oldsyear:{require_from_group:"Вы пропустили", checkold: "Действительна до  Карта заканчивает свое действие ровно через десять лет"},
}
function validation(form,options) {
    var setings = {
        submitFunction:null,
    };
    $.extend(setings, options);
    var $form = $(form);
    if ($form.length && $form.attr('novalidate') === undefined) {
        $form.on('submit', function (e) {
            e.preventDefault();
        });
        $form.validate({
            rules:{
                email:{
                    required: true,
                    maxlength: 72,
                    email: true,
                    remote: {
                        url: "ajax2.php",
                        type: "POST",
                        cache: false,
                        dataType: "json",
                        data: {
                            email: function() { return $("#email").val(); }
                        },
                        dataFilter: function(response) {
                            return jQuery.parseJSON(response);
                        }
                    }
                },
                password:{required: true, minlength: 5, maxlength: 72},
                repassword:{ minlength:3, equalTo:"[name=password]"},
                agree:{required: true},
                namecyr:{required: true, nameCyr:true, minlength: 2, maxlength: 72},
                syrnamecyr:{required: true, nameCyr:true, minlength: 2, maxlength: 72},
                secnamecyr:{required: true, nameCyr:true, minlength: 2, maxlength: 72},
                namelat:{required: true, nameLat:true, minlength: 2, maxlength: 72},
                syrnamelat:{required: true, nameLat:true, minlength: 2, maxlength: 72},
                secnamelat:{ nameLat:true, minlength: 2, maxlength: 72},
                phoneua:{required: true, phoneua:true},
                index:{required: true, number:true,minlength: 5, maxlength: 5 },
                region:{required: true,nameCyr:true, minlength: 2, maxlength: 64 },
                district:{nameCyr:true, minlength: 2, maxlength: 64 },
                city:{required: true, nameCyr:true, minlength: 2, maxlength: 64 },
                street:{required: true, nameCyr:true, minlength: 2, maxlength: 64 },
                house:{required: true, house:true,  maxlength: 8 },
                corpus:{ house:true,  maxlength: 6 },
                flat:{required: true, number:true,minlength: 1, maxlength: 3 },
                passport:{required: true, passport:true,minlength: 2, maxlength: 2 },
                passnum:{required: true, number:true, minlength: 6, maxlength: 6 },
                inn:{required: true, number:true, minlength: 10, maxlength: 10 },
                idnum:{required: true, number:true, minlength: 9, maxlength: 9},
                iddescr:{required: true, iddescr:true, minlength: 5, maxlength: 20},
                whogive:{required: true, nameCyr:true, minlength: 5, maxlength: 100 },
                bdday:{require_from_group:true, birthday:true},
                bdmonth:{require_from_group:true, birthday: true},
                bdyear:{require_from_group:true, birthday: true},
                passday:{require_from_group:true, checkbd:true},
                passmonth:{require_from_group:true, checkbd: true},
                passyear:{require_from_group:true, checkbd: true},
                cardsday:{require_from_group:true, checkbd14:true},
                cardsmonth:{require_from_group:true, checkbd14: true},
                cardsyear:{require_from_group:true, checkbd14: true},
                oldsday:{require_from_group:true, checkold:true},
                oldsmonth:{require_from_group:true, checkold: true},
                oldsyear:{require_from_group:true, checkold: true},
            },
            messages:validationMessages,
            highlight: function(element, errorClass, validClass) {

                $(element).addClass(errorClass).removeClass(validClass);
                $(element).closest('.js-input').addClass(errorClass).removeClass(validClass);
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).removeClass(errorClass).addClass(validClass);
                $(element).closest('.js-input').removeClass(errorClass).addClass(validClass);
            },
            errorPlacement: function(error, element) {
                var errorHTML= '<div class="error-placement"><i class="js-notvalid"><svg><use xlink:href="#notvalid"></use></svg></i><i class="js-valid"><svg><use xlink:href="#valid"></use></svg></i><div class="error-placement-text">'+error.text()+'</div></div>';
                element.closest('.js-input').find('.error-placement').remove();
                element.closest('.js-input').prepend(errorHTML);
            },
            submitHandler: function(form) {
                if( typeof(setings.submitFunction) === 'function' ) {
                    setings.submitFunction(form);
                } else {
                    $form[0].submit();
                }
            }
        });
    }

}
$.validator.methods.email = function( value, element ) {
    return this.optional( element ) || /[A-z\d]+@[A-z\d]+\.[A-z]{2,6}$/g.test( value );
}
$.validator.addMethod("nameCyr", function(value, element) {
    return this.optional(element) || /^[Є-їҐґ \-']+$/g.test(value);
}, "Please specify the correct name");
$.validator.addMethod("nameLat", function(value, element) {
    return this.optional(element) || /^[A-z \-']+$/g.test(value);
}, "Please specify the correct name");
$.validator.addMethod("phoneua", function(value, element){
    return this.optional(element) || /\+38\([\d]{3}\) [\d]{3}\-[\d]{2}\-[\d]{2}/g.test(value);
}, "Please specify the correct UA phone");
$.validator.addMethod("house", function(value, element){
    return this.optional(element) || /^[Є-їҐґ/\\\d \-]+$/g.test(value);
}, "Please specify the house number");
$.validator.addMethod("passport", function(value, element){
    return this.optional(element) || /^[А-Я]+$/g.test(value);
}, "Please specify the passport number");
$.validator.addMethod("iddescr", function(value, element){
    return this.optional(element) || /^[\d\-]+$/g.test(value);
}, "Please specify the  number");
$.validator.addMethod("require_from_group", function(value, element){
    var result;
    var group = $(element).closest('.js-input').find('select.bd-select');
    group.each(function(){
        if($(this).val().length>0){
           result=true;
        }else{
           result = false;
        }
    });
    return result;
}, "Please specify the  data" );
$.validator.addMethod("birthday", function(value, element){
    var elems = $(element).closest('.js-input').find('select.bd-select:blank');
    if(elems.length == 0 ){
        var box = $(element).closest('.js-input--select');
        var day = box.find('select[name=bdday]').val();
        var month = box.find('select[name=bdmonth]').val();
        var year = box.find('select[name=bdyear]').val();
        var bd = new Date(Date.UTC(year, month, day));
        var today = new Date();
        if ((today.getFullYear() - bd.getFullYear()) >= 18){
            if ((today.getMonth()) >= bd.getMonth()){
                if ((today.getDate()+1) >= bd.getDate()){
                    return true;
                }
            }
        }
        return false;
    }
    return true;
}, "18 old");
$.validator.addMethod("checkbd", function(value, element){
    var elems = $('.editinfo .js-input-bd').find('select.bd-select:blank');
    var elems2 = $('.editinfo .js-input-pass').find('select.bd-select:blank');
    if(elems.length == 0 && elems2.length == 0){
        var box = $('.js-input-bd');
        var day = box.find('select[name=bdday]').val();
        var month = box.find('select[name=bdmonth]').val();
        var year = box.find('select[name=bdyear]').val();
        var bd = new Date(Date.UTC(year, month, day));
        var box2 = $(element).closest('.js-input');
        var thisday = box2.find('select[name=passday]').val();
        var thismonth = box2.find('select[name=passmonth]').val();
        var thisyear = box2.find('select[name=passyear]').val();
        var thisdate = new Date(Date.UTC(thisyear, thismonth, thisday));
        if ((thisdate.getFullYear() - bd.getFullYear()) >= 16){
            if ((thisdate.getMonth()) >= bd.getMonth()){
                if ((thisdate.getDate()) >= bd.getDate()){
                    return true;
                }
            }
        }
         return false;
    }
    return true;
}, "dont lie");
$.validator.addMethod("checkbd14", function(value, element){
    var elems = $('.editinfo .js-input-bd').find('select.bd-select:blank');
    var elems2 = $('.editinfo .js-input-card').find('select.bd-select:blank');
    if(elems.length == 0 && elems2.length == 0){
        var box = $('.js-input-bd');
        var day = box.find('select[name=bdday]').val();
        var month = box.find('select[name=bdmonth]').val();
        var year = box.find('select[name=bdyear]').val();
        var bd = new Date(Date.UTC(year, month, day));
        var box2 = $(element).closest('.js-input');
        var thisday = box2.find('select[name=cardsday]').val();
        var thismonth = box2.find('select[name=cardsmonth]').val();
        var thisyear = box2.find('select[name=cardsyear]').val();
        var thisdate = new Date(Date.UTC(thisyear, thismonth, thisday));
        if ((thisdate.getFullYear() - bd.getFullYear()) >= 14){
            if ((thisdate.getMonth()) >= bd.getMonth()){
                if ((thisdate.getDate()) >= bd.getDate()){
                    return true;
                }
            }
        }
        return false;
    }
    return true;
}, "dont lie");
$.validator.addMethod("checkold", function(value, element){
    var elems = $('.editinfo .js-input-card').find('select.bd-select:blank');
    var elems2 = $('.editinfo .js-input-olds').find('select.bd-select:blank');
    console.log(elems.length+'+'+elems2.length);
    if(elems.length == 0 && elems2.length == 0){
        var box = $('.editinfo .js-input-card');
        var day = box.find('select[name=cardsday]').val();
        var month = box.find('select[name=cardsmonth]').val();
        var year = box.find('select[name=cardsyear]').val();
        var bd = new Date(Date.UTC(year, month, day));
        var box2 = $(element).closest('.js-input');
        var thisday = box2.find('select[name=oldsday]').val();
        var thismonth = box2.find('select[name=oldsmonth]').val();
        var thisyear = box2.find('select[name=oldsyear]').val();
        var thisdate = new Date(Date.UTC(thisyear, thismonth, thisday));
        if ((thisdate.getFullYear() - bd.getFullYear()) > 10){return false;}
        else if ((thisdate.getFullYear() - bd.getFullYear()) == 10){
            if ((thisdate.getMonth()) > bd.getMonth()){return false;}
            else if ((thisdate.getMonth()) == bd.getMonth() && (thisdate.getDate()) > bd.getDate()){ return false; }
        }
        return true;
    }
    return true;
}, "dont lie");
$.validator.addMethod("innru", function (value, element) {
    var multipliers = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8],
        inn = value.split(''), i, j, ch = [0, 0, 0];
    for (i = 0; i < 12; i++)
        for (j = 0; j < 3; j++)
            if (multipliers[i + j])
                ch[j] = ch[j] + inn[i] * multipliers[i + j];
    if (inn.length == 10)
        return inn[9] == ch[2] % 11 % 10;
    else if (inn.length == 12)
        return inn[10] == ch[1] % 11 % 10 && inn[11] == ch[0] % 11 % 10;
    else
        return !value;
}, "Ошибка при наборе ИНН");
$(document).ready(function(){
    validation('#reg-popup form');
    validation('#enter-popup form');
    validation('form#editinfo');
});