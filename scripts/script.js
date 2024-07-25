		// Анимация бокового меню через jquery
		$(document).ready(function(){
			$(".vertical-menu").hover(
				function() {
					$(this).animate({width: "300px"}, 100);//раскрытие бокового меню
					$(".overlay").fadeIn(500); // Показать затемнение
				},
				function() {
					$(this).animate({width: "60px"}, 100);//сворачивание бокового меню
					$(".overlay").fadeOut(500); // Скрыть затемнение
				}
			);

			$(".vertical-menu a").click(function() {
				var icon = $(this).find(".icon img");
				var text = $(this).find(".menu-text");
				
				// Анимация иконки
				icon.css({transition: "transform 1s"});
				icon.css({transform: "rotate(360deg)"});

				// Анимация текста
				text.animate({fontSize: "0px"}, 300, function() {
					text.animate({fontSize: "16px"}, 300); // Возвращаем текст к исходному размеру
				});

				// Сброс анимации иконки
				setTimeout(function() {
					icon.css({transform: "rotate(0deg)"});
				}, 1000);
			});
			
			
	
			 // Добавляем жирный шрифт, увеличение размера и изменение цвета при наведении курсора
			$(".vertical-menu a").hover(
				function() {
					$(this).css({
						"font-weight": "bold",
						"font-style": "italic",
						"color": "yellow"
					});
				},
				function() {
					$(this).css({
						"font-weight": "normal",
						"font-style": "normal",
						"color": "white"
					});
				}
			);
			
			// Обработчик клика для пункта "Наши объекты"
			$("#works-link").click(function(event) {
				event.preventDefault();
				window.location.href = "works.html";
			});
			
			// Обновление года в футере
			// Этот код использует AJAX для получения текущей даты и времени с сервера worldtimeapi.org и обновляет год в футере
			$.ajax({
				url: 'https://worldtimeapi.org/api/timezone/Etc/UTC',
				method: 'GET',
				success: function(response) {
					var currentYear = new Date(response.datetime).getFullYear();
					$('#current-year').text(currentYear);
				},
				error: function() {
					var currentYear = new Date().getFullYear();
					$('#current-year').text(currentYear);
				}
			});
			
			// Показать popup при нажатии на кнопку "Регистрация"
			$('#register-link').on('click', function(event){
				event.preventDefault();
				$('#overlay, #popup').fadeIn();
			});

			// Закрыть popup при нажатии на кнопку закрытия или overlay
			$('#closePopup, #overlay').on('click', function(){
				$('#overlay, #popup').fadeOut();
			});

			// Проверка правильности данных в форме
			$('#login-form').on('submit', function(event){
				event.preventDefault();
				
				var username = $('#username').val();
				var password = $('#password').val();
				var errorMessage = '';

				if (username === '') {
					errorMessage += 'Username is required.\n';
				}

				if (password === '') {
					errorMessage += 'Password is required.\n';
				} else if (password.length < 8) {
					errorMessage += 'Password must be at least 8 characters long.\n';
				}

				if (errorMessage !== '') {
					alert(errorMessage);
				} else {
					alert('Form submitted successfully!');
					$('#overlay, #popup').fadeOut(); // Закрыть окно после успешной регистрации
					// Здесь можно добавить код для отправки формы на сервер
				}
			});
		});
		
		// Загрузка интерактивной Яндекс карты
		
       function loadMap() {
            var mapContainer = document.getElementById('map-container');
            var iframe = document.createElement('iframe');
            iframe.src = 'https://yandex.ru/map-widget/v1/?ll=61.392187%2C55.167231&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1NjA1MDgxMBI80KDQvtGB0YHQuNGPLCDQp9C10LvRj9Cx0LjQvdGB0LosINGD0LvQuNGG0LAg0KLRgNGD0LTQsCwgMTU3IgoNmZF1QhU_q1xC&z=17.69';
            iframe.width = '100%';
            iframe.height = '800';
            iframe.frameBorder = '1';
            iframe.allowFullscreen = true;
            iframe.style.position = 'relative';
            mapContainer.appendChild(iframe);
        }

        window.onload = loadMap;	
		
		// Погода с использованием AJAX (работает только с VPN)
		var request = new XMLHttpRequest();
        request.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=Chelyabinsk&units=metric&APPID=b03a2cfad336d11bd9140ffd92074504", true);
        request.responseType = "json";
        request.onload = function() {
            if (request.status === 200) {
                var response = request.response;
                var weatherInfo = `Температура: ${response.main.temp}°C, Описание: ${response.weather[0].description}`;
                document.getElementById('weather-info').innerText = weatherInfo;
            } else {
                document.getElementById('weather-info').innerText = 'Не удалось загрузить данные о погоде.';
            }
        };
        request.onerror = function() {
            document.getElementById('weather-info').innerText = 'Произошла ошибка при загрузке данных (необходимо включить VPN)';
        };
        request.send();
		
		

		
