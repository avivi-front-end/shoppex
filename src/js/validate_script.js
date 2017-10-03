
var validationMessages = {
    email:{required: "Вы пропустили", maxlength: "превышает 72", email:"невалидный почта", remote:"ответочка от бека"},
    password:{required: "Вы пропустили", minlength: "минимум 6", maxlength: "превышает 72",},
    repassword:{required: "Вы пропустили",equalTo:"пароли не совпадают.", minlength: "минимум 6", maxlength: "превышает 72",},
    agree:{required: "Вы пропустили"}
}
$(document).ready(function(){
    $('#reg-popup form').validate({
        rules:{
            email:{
                email:{
                    required: true,
                    maxlength: 42,
                    email: true,
                    remote: {
                        url: "ajax.php",
                        type: "POST",
                        cache: false,
                        dataType: "json",
                        data: {
                            email: function() { return $("#email").val(); }
                        },
                        dataFilter: function(response) {
                            console.log(jQuery.parseJSON(response));
                            return jQuery.parseJSON(response);
                        }
                    }
                },
            },
            password:{required: true, minlength: 5, maxlength: 72,},
            repassword:{ minlength:3, equalTo:"[name=password]",},
            agree:{required: true}

        },
        messages:validationMessages
    });

});