import { useState, useEffect } from 'react'
import firebase from './firebaseConnection'
import './index.css'
import logo from './assets/draxx_3.png'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
    const [musica, setMusica] = useState('')

    const [musicas, setMusicas] = useState([])

    useEffect(() => {
        async function loadMusicas() {
            await firebase
                .firestore()
                .collection('musicas')
                .onSnapshot((songs) => {
                    let minhasMusicas = []

                    songs.forEach((item) => {
                        minhasMusicas.push({
                            id: item.id,
                            musica: item.data().musica,
                            dateTime: item.data().date_time,
                        })
                    })

                    minhasMusicas.sort((songA, songB) => {
                        if (songA.dateTime > songB.dateTime) {
                            return -1
                        }
                        if (songA.dateTime < songB.dateTime) {
                            return 1
                        }
                        return 0
                    })

                    setMusicas(minhasMusicas)
                })
        }

        loadMusicas()
    }, [])

    async function handleAdd(e) {
        e.preventDefault()

        if (musica !== '') {
            await firebase
                .firestore()
                .collection('musicas')
                .add({
                    musica: musica,
                    date_time: new Date().toISOString(),
                })
                .then(() => {
                    setMusica('')
                    toast.success('Música enviada com sucesso!')
                })
                .catch((error) => {
                    console.log('ERRO: ' + error)
                })
        } else {
            toast.error('Preencha para enviar')
        }
    }

    return (
        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img src={logo} alt="logo da banda" />
                </div>

                <span className="message">
                    <b>Escolha sua música!</b>
                </span>
                <input
                    type="text"
                    maxlenpgth="30"
                    placeholder="digite o nome da banda e da música"
                    value={musica}
                    onChange={(e) => setMusica(e.target.value)}
                />
                <button onClick={handleAdd}>Enviar</button>

                <div className="list">
                    <label>Músicas escolhidas:</label>
                    {musicas.length ? (
                        <ul>
                            {musicas.map((musica) => {
                                console.log(musicas)
                                return (
                                    <li key={musica.id}>
                                        <span> {musica.musica} </span>
                                    </li>
                                )
                            })}
                        </ul>
                    ) : (
                        <label className="render">Não há músicas enviadas :(</label>
                    )}
                </div>
            </div>
        </div>
    )
}

export default App
