const fetchRequest = (url) => {
    return new Promise(function (resolve, reject) {
        fetch(url)
            .then(response => {
                console.log(response)
                if (response.ok) {
                    return response.json()
                } else {
                    reject({ success: false, status: response.status, message: response.statusText })
                }
            })
            .then(data => resolve({ success: true, status: 200, data }))
            .catch(err => reject({ success: false, status: 500, message: err.message }))
    }).catch(error => {
        return error
    });
}

export default fetchRequest