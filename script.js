// Проверяем, отправлял ли пользователь уже форму
let isFormSubmitted = localStorage.getItem("formSubmitted");
document.getElementById("clearButton").addEventListener("click", () => {
  localStorage.removeItem("formSubmitted");
  location.reload();
});

if (isFormSubmitted) {
  // Если форма уже отправлялась, скрываем форму и показываем сообщение

  document.getElementById("button").disabled = true;
}

document
  .getElementById("orderForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию

    // Если форма уже отправлялась, прекращаем выполнение
    if (isFormSubmitted) return;

    // Получаем значения из формы
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;

    // Создаем объект с данными для отправки
    var data = {
      stream_code: "vv4uf",
      client: {
        phone: phone,
        name: name,
      },
    };

    // Отправляем запрос через fetch API
    fetch("https://order.drcash.sh/v1/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer RLPUUOQAMIKSAB2PSGUECA",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          // Сохраняем информацию о том, что форма отправлена
          localStorage.setItem("formSubmitted", true);

          // Перенаправляем на страницу "спасибо"
          window.location.href = "thank-you.html";
        } else {
          alert("Ошибка при отправке заявки");
        }
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        alert("Ошибка при отправке заявки");
      });
  });
