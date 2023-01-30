import { useEffect, useState } from "react";

const App = () => {

    const [languages, setLanguages] = useState([]);
    const [form, setForm] = useState({
        source: "Hello, World!",
        output: "Привет, Мир!",
        lang: "ru"
    });

    useEffect(() =>{
        fetch("https://google-translate1.p.rapidapi.com/language/translate/v2/languages", {
            headers: {
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
                'X-RapidAPI-Host': import.meta.env.VITE_API_HOST
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setLanguages(data.data.languages);
            });
    }, []);

    const LanguageOptions = languages.map((item) => {
        return (
            <option key={item.language} value={item.language}>
                {item.language}
            </option>
        )
    }) 

    const onClickTransliteHandle = () => {

        const body = {
            q: "Hello my fucking friend!",
            target: "ru",
            source: "en"
        };

        fetch("https://google-translate1.p.rapidapi.com/language/translate/v2/languages", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept-Encoding': 'application/json',
                'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
                'X-RapidAPI-Host': import.meta.env.VITE_API_HOST
            },
            body: JSON.stringify(body)
        })
        
            .then(response => response.json())
            .then((data) => console.log(data));
    };

    // process.env.API_KEY

    // console.log(import.meta.env.VITE_API_KEY);

    

    return(
        <section>
            <div className="container">
                <div className="wrapper">
                    <h1> Transslate </h1>

                    {/* ЛЕВАЯ ЧАСТЬ */}
                    <div className="form">
                        <div className="form__left">
                            <textarea name="source">
                                Hello, World!
                            </textarea>
                        </div>

                    {/* ПРАВАЯ ЧАСТЬ */}
                        <div className="form__right">
                            <select name="lang">
                                {LanguageOptions}
                            </select>

                            <textarea name="output">
                                Привет, мир!
                            </textarea>
                        </div>
                    </div>

                    <button onClic>Translate Now</button>
                </div>
            </div>
        </section>
    );

}

export default App;
