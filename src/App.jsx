import axios from "axios";
import { useRef, useState } from "react"
import { youtube_parser } from "./utils";
import Footer from "./components/Footer.jsx";

function App() {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);
  const [hint, setHint] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("inputUrlRef.current.value",inputUrlRef.current.value);
    const youtubeID = youtube_parser(inputUrlRef.current.value);

    const options = {
      method: 'get',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      },
      params: {
        id: youtubeID
      }
    }
    // 发送请求
    setHint("Please wait for 5-10 seconds")
    axios(options)
        .then(res => {
          setUrlResult(res.data.link)
          setHint(null)
        })
      .catch(err => {
        console.log(err)
        setHint("There seems to be a slight anomaly, please try again later")
      })

    inputUrlRef.current.value = '';

  }

  return (
    <div className="app">
      {/*<span className="logo">Nahuel Astudillo</span>*/}
      <section className="content">
        <h1 className="content_title">Descargar MP3 gratis de youtube</h1>
        <p className="content_description">
          Copias el link de tu cancion en youtube y lo pegas acá.
        </p>

        <form onSubmit={handleSubmit} className="form">
          <input ref={inputUrlRef} placeholder="Pegar link del video de youtube..." className="form_input" type="text" />
          <button type="submit" className="form_button">Procesar</button>
        </form>

        {hint ? <span rel="noreferrer" className="download_btn">hint</span> : <span className="download_btn"></span>}
        {urlResult ? <a target='_blank' rel="noreferrer" href={urlResult} className="download_btn">Download MP3</a> : <span className="download_btn"></span>}

      </section>
      <Footer />
    </div>
  )
}

export default App


