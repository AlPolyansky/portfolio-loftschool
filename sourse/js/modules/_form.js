// =========== Form module ===========

var formModule = (function() {

    var base = new BaseModule();


    var createPopUpWindow = function(text){
        $("<div class='popUpWindow'><div class='popUpWindow__container'><span class='popUpWindow__close'></span><p class='popUpWindow__text'>"+ text +"</p></div></div>"
            ).prependTo($("body"));

       $("body").addClass("no-scroll");
        $(".popUpWindow__close").on("click",function(){
            var $popUpWindow = $(".popUpWindow");
            $(this).closest($popUpWindow).addClass("hide");
            $("body").removeClass("no-scroll");
            var $this = $(this);
            setTimeout(function(){
                $this.closest($($popUpWindow)).remove();
            },400);

        });
    }

    var loginForm = function(){

        var xhr = new XMLHttpRequest();
             xhr.open('POST', '/admin',true)

            var data = {
                user: document.getElementById('form-name').value,
                pass: document.getElementById('form-pass').value
            };
            xhr.setRequestHeader('Content-type','application/json');
            xhr.send(JSON.stringify(data));;
            xhr.onreadystatechange = function(){
                if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
                    location.href = '/admin.html';

                }else if(xhr.readyState === XMLHttpRequest.DONE){
                    var text = "Данные не правильные";
                    xhr.abort(createPopUpWindow(text));
                };
            }
       
        
    }

    var formValidation = function(thisElem){
        var pattern = /^([0-9a-zA-Z_-]+\.)*[0-9a-zA-Z_-]+@[0-9a-zA-Z_-]+(\.[0-9a-zA-Z_-]+)*\.[a-z]{2,6}$/;
        var form = thisElem.closest("form");
        var items = form.find(".form__item");
        var input = items.find(".form__input");
        var error = {
                number : 0,
                text : "Успешно"
        };
        var emptyInput = (function(){
            items.each(function(){
                if($(this).children(input).val() === ""){
                    error.number = 1;
                    error.text = "Заполнены не все поля";
                    return error;
            }          
            })
        })()

        if(form.find("[name = email]").length && !error.number){
            var email = items.find("[name = email]");
            if(!pattern.test(email.val())){
                error.number = 2;
                error.text = "Email не правильный";
            }
        }
        if(form.find("[name = checkbox]").length && !error.number){

            var checkbox = form.find("[name = checkbox]:checked").length
            if(!checkbox){
                error.number = 3;
                error.text = "Вы человек?";
            }
        }
        if(form.find("[name = radio]").length && !error.number){

            var radio = form.find("#form-radio-yes:checked").length
            if(!radio){
                error.number = 4;
                error.text = "Роботам здесь не место!";
            }
        }  
        switch (error.number) {
            case 1:
                createPopUpWindow(error.text);
            break;
            case 2:
                createPopUpWindow(error.text);
            break;
            case 3:
                createPopUpWindow(error.text);
            break;
            case 4:
                createPopUpWindow(error.text);
            break;
            case 0:
                loginForm();
            break;
            default:
        }


    }

    var _addPopUpWindow = function(){
        var $button = $("[type=submit]");
        $button.on("click",function(e){
            e.preventDefault();
            formValidation($(this));
        })
    }

    var _setUpListner = function () {


    };
    return {
        init: function () {
            _setUpListner();
            _addPopUpWindow();
        }

    }
})();