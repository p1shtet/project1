document.addEventListener('DOMContentLoaded', function() {
    const temp1Element = document.getElementById('temp1');
    const temp2Element = document.getElementById('temp2');
    const temp3Element = document.getElementById('temp3');
    const refreshButton = document.getElementById('refreshButton');

    const sensorIP = 'http://192.168.88.235:5000'; // Базовый URL датчика (без эндпоинта)

    async function fetchTemperatures() {
      try {
           // Отправляем запросы к каждому сенсору отдельно.
          const [temp1, temp2, temp3] = await Promise.all([
            fetch(`${sensorIP}/sensor1`).then(res => {
                 if (!res.ok) {
                      throw new Error(`HTTP error! status: ${res.status}`);
                  }
                  return res.text()
            }),
            fetch(`${sensorIP}/sensor2`).then(res => {
              if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                 return res.text()
             }),
            fetch(`${sensorIP}/sensor3`).then(res => {
              if (!res.ok) {
                   throw new Error(`HTTP error! status: ${res.status}`);
                 }
                  return res.text()
             })
          ]);

         temp1Element.textContent = temp1 + ' °C';
         temp2Element.textContent = temp2 + ' °C';
         temp3Element.textContent = temp3 + ' °C';
      }
       catch (error) {
           console.error('Ошибка при получении данных:', error);
            temp1Element.textContent = 'Ошибка';
            temp2Element.textContent = 'Ошибка';
            temp3Element.textContent = 'Ошибка';
       }
    }

    fetchTemperatures();

    refreshButton.addEventListener('click', fetchTemperatures);
});
