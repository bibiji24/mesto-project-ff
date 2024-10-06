const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-24',
    headers: {
        authorization: '7c1f2dae-1abb-4190-8fa4-da81ed7cd155',
        'Content-Type': 'application/json'
    }
};

function processResponse(res) {
	if (res.ok) {
		return res.json();
	}

	return Promise.reject(res.status);
}

// запрос данных о пользователе
export function takeUserInfo() {
	const { baseUrl, headers} = config;
	return fetch(`${baseUrl}/users/me`, {
		method: 'GET',
		headers: headers
	}).then(processResponse)
}

// запрос данных карточек
export function takeNewCards() {
	const { baseUrl, headers} = config;
	return fetch(`${baseUrl}/cards`, {
		method: 'GET',
		headers: headers
	}).then(processResponse)
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
	}).then(processResponse)
}

// отправка данных о новой карточке
export function sendNewCard(newData) {
	const { baseUrl, headers} = config;
	const { name, link } = newData;
	return fetch(`${baseUrl}/cards`, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(newData)
	}).then(processResponse)
}

// удаление карточки на сервере
export function sendDeleteCardRequest(cardId) {
	const { baseUrl, headers} = config;
	return fetch(`${baseUrl}/cards/${cardId}`, {
		method: 'DELETE',
		headers: headers,
	}).then(processResponse)
}

export function sendLike(cardId, howChange) {
	const { baseUrl, headers} = config;
	return fetch(`${baseUrl}/cards/likes/${cardId}`, {
		method: howChange,
		headers: headers,
	}).then(processResponse)
}
