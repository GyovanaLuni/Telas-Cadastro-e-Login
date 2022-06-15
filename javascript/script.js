class Validacao {
    constructor(){
        this.validations = [
            'data-required',
            'data-password-validate',
            'data-min-length',
            'data-max-length',
            'data-email-validate',
            'data-only-letters',
            'data-equal',

        ]
    }
    validate(form) {
        let currentValidations = document.querySelectorAll('form .error-sign')

        if (currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }
        //pegar inputs
        let inputs = form.getElementsByTagName('input')

        //HTLM collections -> array

        var inputsLista = [...inputs];

        //loop inputs e validação

        inputsLista.forEach(function(input){
            for (let i=0; this.validations.length > i; i++){
                if (input.getAttribute(this.validations[i] )!= null) {
                    //limpando string
                    let method = this.validations[i].replace('data-','').replace('-','')
                    //valor do input
                    let value = input.getAttribute(this.validations[i]);
                    //invocar metodo
                    this[method](input, value);
            };
        };
    },this);
}
maxlength(input, maxValue){
    let inputLength = input.value.length
    let errorMessage = 'O campo precisa ter menos que ' + maxValue + ' caracteres.'
    if (inputLength>maxValue) {
        this.printMessage(input, errorMessage);
    }
}
minlength(input, minValue){
    let inputLength = input.value.length
    let errorMessage = 'O campo precisa ter pelo menos ' + minValue + ' caracteres.'
    if (inputLength<minValue) {
        this.printMessage(input, errorMessage);
    }
};
printMessage(input, msg) {
    let errorsQty = input.parentNode.querySelector('.error-sign');
    if (errorsQty === null) {
        let template = document.querySelector('.error-sign').cloneNode(true);
        template.textContent = msg;
        let inputParent = input.parentNode;
        template.classList.remove('template');
        inputParent.appendChild(template);
    };

}
emailvalidate(input){
    let re = /\S+@\S+\.\S+/;
    let email = input.value
    let errorMessage = 'Insira um email no formato nome@email.com'
    if (!re.test(email)){
      this.printMessage(input, errorMessage)  
    }
}

onlyletters(input) {
    let re = /^[A-Za-z]+$/;
    let inputValue = input.value;
    let errorMessage = 'Esse campo não aceita números ou caracteres especiais.'
    if (!re.test(inputValue)) {
        this.printMessage(input, errorMessage);
    }
}

equal(input, inputName) {
    let inputToCompare = document.getElementsByName(inputName)[0];
    let errorMessage = 'As senhas não correspondem'
    if (input.value != inputToCompare.value) {
        this.printMessage(input, errorMessage)
    }
}

passwordvalidate(input){
    let charArr = input.value.split('');
    let uppercases = 0;
    let numbers = 0;
    for(let i = 0; charArr.length > i; i++) {
        if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))){
            uppercases++;
        }else if(!isNaN(parseInt(charArr[i]))){
            numbers++;
        }
    }

    if(uppercases === 0 || numbers === 0){
        let errorMassege = 'A senha precisa de um caracter maiúsculo e um número';

        this.printMessage(input, errorMassege);
    }
    
}

required(input){

    let inputValue = input.value;
    if (inputValue === '') {
        let errorMessage = 'Este campo é obrigatório';
        this.printMessage(input, errorMessage);
    }
}
cleanValidations(validations) {
    validations.forEach(el => el.remove())
}
}

var form = document.getElementById("formulario")
var login = document.getElementById("loginform")
var submit = document.getElementById("btn-submit")
var join = document.getElementById("submit-button")
let validator = new Validacao()


submit.addEventListener('click', function(e){
    e.preventDefault();
    validator.validate(form);
});

join.addEventListener('click', function(e){
    e.preventDefault();
    validator.validate(login);
});