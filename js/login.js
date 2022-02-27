const elLoginForm = document.querySelector(".login__form");
const elLoginInput = document.querySelector(".form__input");
const elPswrdInput = document.querySelector(".form__pswrd");

elLoginForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const emailInput = elLoginInput.value.trim();
  const pswrdInput = elPswrdInput.value.trim();

  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailInput,
      password: pswrdInput,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.token) {
        localStorage.setItem("token", data.token);
        window.location.replace("users.html");
      }
    });
});
