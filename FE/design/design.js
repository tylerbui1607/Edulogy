$('.slider-container').slick({
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  prevArrow: '.pre-btn',
  nextArrow: '.next-btn'
});
function showLoginForm(){
  var modal = document.getElementsByClassName("app")[0];
  modal.classList.toggle('active');
}

function closeModalForm(){
  var modal = document.getElementsByClassName("app")[0];
  modal.classList.remove('active');
  var loginForm = document.querySelector(".login_form1");
  loginForm.style.display = "flex";
  var signupForm = document.querySelector(".signup");
  signupForm.style.display = "none";
}
function openSignupform(){
  var loginForm = document.querySelector(".login_form1");
  loginForm.style.display = "none";
  var signupForm = document.querySelector(".signup");
  signupForm.style.display = "flex";
}
const nav = document.querySelector('.nav');
let prevScrollpos = window.pageYOffset;

window.addEventListener('scroll',()=>{
  let currentScrollpos = window.pageYOffset;

  if(prevScrollpos< currentScrollpos){
    if(document.documentElement.scrollTop>100)
    {
      document.querySelector('.nav').style.background = "white";
    }
    nav.classList.add('hide');
  }
  else{
    nav.classList.remove('hide');
  }

  prevScrollpos = currentScrollpos;
}
)