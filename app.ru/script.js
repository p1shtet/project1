document.addEventListener('DOMContentLoaded', function() {
    const temp1Element = document.getElementById('temp1');
    const temp2Element = document.getElementById('temp2');
    const temp3Element = document.getElementById('temp3');
    const refreshButton = document.getElementById('refreshButton');

    // Функция для запроса данных с сервера
    function fetchTemperatures() {
        fetch('http://ваш_сервер_ip:5000/get_temperatures') // Замените на IP вашего сервера
            .then(response => {
                 if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                  }
                return response.json();
            })
            .then(data => {
                temp1Element.textContent = data.sensor1 + ' °C';
                temp2Element.textContent = data.sensor2 + ' °C';
                temp3Element.textContent = data.sensor3 + ' °C';
            })
             .catch(error => {
                console.error('Ошибка при получении данных:', error);
                  temp1Element.textContent = 'Ошибка';
                  temp2Element.textContent = 'Ошибка';
                  temp3Element.textContent = 'Ошибка';
            });
    }

    fetchTemperatures();

    refreshButton.addEventListener('click', fetchTemperatures);
});