let mysql = require("mysql")
let inquirer = require("inquirer")

let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'top_songsdb'
})

function start() {
    inquirer.prompt([
        {
            type: 'rawlist',
            message: 'Pick a Selection:',
            name: 'choice',
            choices: ['Get songs by artist', 'Get artists who has multiple songs in top 5000', 'Select Songs with year range', 'Select by song title', 'Exit']
        }
    ]).then(function (answer) {
        switch (answer.choice) {
            case 'Get songs by artist':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'artist',
                        message: 'Enter artist'
                    }
                ]).then(function (answer1) {
                    connection.query('SELECT song FROM top5000 WHERE ?',
                        [{ artist: answer1.artist }],
                        function (err, res) {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                for (let i = 0; i < res.length; i++) {
                                    console.log(res[i].song)
                                }
                                start()
                            }
                        })
                })
                break
            case 'Get artists who has multiple songs in top 5000':
                connection.query('SELECT artist, COUNT(*) AS number_of_songs FROM top5000 GROUP BY artist HAVING number_of_songs > 1',
                    [],
                    function (err, res) {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            for (let i = 0; i < res.length; i++) {
                                console.log(`${res[i].artist} | ${res[i].number_of_songs}`)
                            }
                            start()
                        }
                    })
                break
                case 'Select Songs with year range':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'beginningYear',
                        message: 'Enter beginning year'
                    },
                    {
                        type: 'input',
                        name: 'endingYear',
                        message: 'Enter ending year'
                    }
                ]).then(function (answer) {
                    connection.query('SELECT song, artist, year FROM top5000 WHERE year >= ? AND year <= ?',
                        [answer.beginningYear, answer.endingYear],
                        function (err, res) {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                for (let i = 0; i < res.length; i++) {
                                    console.log(`${res[i].song} | ${res[i].artist} | ${res[i].year}`)
                                }
                                start()
                            }
                        })
                })
                break
            case 'Select by song title':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'song',
                        message: 'Enter song'
                    }
                ]).then(function (answer1) {
                    connection.query('SELECT song, artist, year FROM top5000 WHERE ?',
                        [{ song: answer1.song }],
                        function (err, res) {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                for (let i = 0; i < res.length; i++) {
                                    console.log(`${res[i].song} | ${res[i].artist} | ${res[i].year}`)
                                }
                                start()
                            }
                        })
                })
                break
            case 'Exit':
                connection.end()
                break
        }
    })
}

start()