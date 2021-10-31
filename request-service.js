class RequestService {

    getPlayers() {
        return fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(response => response.json()).then(data => data);
    }

    getRandomPlayer() {
        return fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(response => response.json()).then(data => data);
    }

    fight({hit, defence}) {
        return fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
            method: 'POST',
            body: JSON.stringify({
                hit,
                defence,
            })
        });
    }
}

export default RequestService;
