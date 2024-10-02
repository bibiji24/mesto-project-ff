const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-24',
    headers: {
        authorization: '7c1f2dae-1abb-4190-8fa4-da81ed7cd155',
        'Content-Type': 'application/json'
    }
};

// запрос данных о пользователе
export function takeUserInfo() {
	const { baseUrl, headers} = config;
	return fetch(`${baseUrl}/users/me`, {
		method: 'GET',
		headers: headers
	}).then(res => {
		if (res.ok) {
			return res.json();
		}

		return Promise.reject(res.status);
	})
}

// запрос данных карточек
export function takeNewCards() {
	const { baseUrl, headers} = config;
	return fetch(`${baseUrl}/cards`, {
		method: 'GET',
		headers: headers
	}).then(res => {
		if (res.ok) {
			return res.json();
		}

		return Promise.reject(res.status);
	})
}

// обновление данных о пользователе на сервере
export function updateUserData(newData, isItAvatar) {
	const { baseUrl, headers} = config;
	let avatarOption = ''
	if (isItAvatar) {
		avatarOption = '/avatar';
	}
	return fetch(`${baseUrl}/users/me${avatarOption}`, {
		method: 'PATCH',
		headers: headers,
		body: JSON.stringify(newData)
	}).then(res => {
		if (res.ok) {
			return res.json();
		}

		return Promise.reject(res.status);
	})
}

// отправка данных о новой карточке
export function sendNewCard(newData) {
	const { baseUrl, headers} = config;
	const { name, link } = newData;
	return fetch(`${baseUrl}/cards`, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(newData)
	}).then(res => {
		if (res.ok) {
			return res.json();
		}

		return Promise.reject(res.status);
	})
}

// удаление карточки на сервере
export function sendDeleteCardRequest(cardId) {
	const { baseUrl, headers} = config;
	return fetch(`${baseUrl}/cards/${cardId}`, {
		method: 'DELETE',
		headers: headers,
	})
}

export function sendLike(cardId, howChange) {
	const { baseUrl, headers} = config;
	return fetch(`${baseUrl}/cards/likes/${cardId}`, {
		method: howChange,
		headers: headers,
	}).then(res => {
		if (res.ok) {
			return res.json();
		}

		return Promise.reject(res.status);
	})
}

// обработка ошибки при запросе на сервер
export function handleError(err) {
	console.log(`Error: ${err}`);
}