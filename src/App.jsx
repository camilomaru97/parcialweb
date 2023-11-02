import { useEffect, useState } from "react";
import { Result } from "./components/Result";

export const App = () => {

	const [data, setData] = useState([])
  const [question, setQuestion] = useState()
  const [correctAnswer, setCorrectAnswer] = useState()
  const [selectedOption, setSelectedOption] = useState(null);
  const [finishStep, setFinishStep] = useState(null)
  const [results, setResults] = useState([])
  const [isResultDone, setisResultDone] = useState(null)
  const [error, setError] = useState(null)
  const [score, setScore] = useState(0)
  const [count, setCount] = useState(0)
  const [seconds, setSeconds] = useState(300);
  const [minutes, setMinutes] = useState(5);

  
  
  const fig = [
    {
      // Triangulo rojo
      svg: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 100 100">
            <polygon points="50,10 10,90 90,90" fill="#E84771" />
          </svg>
    },
    {
      // Circulo amarillo
      svg:<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="#F39D16" />
          </svg>
    
    },
    {
      // Rectangulo verde
      svg:<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 100 100">
            <rect x="10" y="10" width="80" height="80" fill="#329F78" />
          </svg>
    
    },
    {
      // Estrella azul
      svg:<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 100 100">
            <polygon points="50,10 10,50 50,90 90,50" fill="#0685A5" />
          </svg>
    }
  ]

	useEffect( () => {
		const fetchData = async () => {
			const url = 'http://localhost:5000/preguntas'
			fetch(url)
			const resp = await fetch(url);
			const data = await resp.json();
			setData(data);
		}
		fetchData();
	},[])

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
        if (seconds % 60 === 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, setQuestion]);

  const hanldeInit = () => {
    const slice = data.slice(0, 1)
    setQuestion(slice)
  }

  const handleNext = () => {
    if(selectedOption === null){
      setError("Debes seleccionar una respuesta")
      setTimeout(() => {
        setError(null)
      }, 5000);
      return 
    }
    setResults((prevItem) => [...prevItem, selectedOption])
    setSelectedOption(null)
    setCount(count + 1);
    const start = count + 1;
    const end = count + 2;
    const slice = data.slice(start, end);
    setQuestion(slice);
    if(correctAnswer === false) return
    if(correctAnswer === true){
      setScore(score + 1)
    }
    console.log(score)
  };

  const handleFinish = () => {
    setFinishStep(true)
  }

  const handleResults = () => {
    setisResultDone(true)
  }

  const handleReset = () => {
    setFinishStep(false)
    setQuestion()
    setCount(0)
    setScore(0)
    setSeconds(300)
    setMinutes(5)
    setResults([])
    setisResultDone(null)
  }

  const handleSendResults = () => {
    console.log('Enviando')
  }
  
  const handleGetAnswer = (e, id) => {
    e.preventDefault();
    const selectAnswer = e.target.innerText;
    const findQuestion = data.filter(question => question.id === id)

    if (selectAnswer === findQuestion[0].answer ) {
      setCorrectAnswer(true)
    } else {
      setCorrectAnswer(false)
    }
    setSelectedOption(selectAnswer);
  }

  return (
    <div className="container">
      <main>
        <section>
        <div>
            {
              !isResultDone && <p>Tiempo: {minutes} minutos {seconds % 60} segundos</p>
            }
        </div>
          <div>
            { question &&
            question.map((question) => {
              return (
                <div className="box" key={question.id}>
                  <h1>{question.question}</h1>
                  <h2>{question.info}</h2>
                  <img src={question.img} alt={question.question} />
                  {question.options.map((option, index) => (
                    
                    <button
                      style={{textAlign: "left"} }
                      className={selectedOption === option ? "selected" : ""}
                      key={option}
                      onClick={(e) => handleGetAnswer(e, question.id)}
                    >
                      {fig[index].svg}
                      {option}
                    </button>
                    
                  ))
                }
                </div>
              );
            })}
          </div>
          {question !== undefined && question.length > 0  && <button className="btn-next" onClick={handleNext}>Siguiente</button>} 
          {question === undefined && <button className="btn-start" onClick={hanldeInit}>Comenzar</button>} 
          {question?.length === 0 && !finishStep === true && <button className="btn-end" onClick={handleFinish}>Enviar Respuestas</button>} 
          {finishStep === true && !isResultDone && <button className="btn-finish" onClick={handleReset}>Volver a intentar</button>} 
          {finishStep === true && !isResultDone && <button className="btn-results" onClick={handleResults}>Ver Resultados</button>}
          {isResultDone === true && <button className="btn-results" onClick={handleSendResults}>Guardar Resultados</button>}
          {isResultDone === true && finishStep === true && <button className="btn-results" onClick={handleReset}>Volver a intentar</button>}
           
        </section>
        <div style={{ flex: '100%', color: '#E84771', textAlign: 'center'}}>
          {error && <div className="error">{error}</div>}
        </div>
        {finishStep && !isResultDone &&
          <div className="box">
            <h1>Gracias por participar</h1>
            <h2>Tu puntaje es: {score}</h2>
          </div>
          
        }
        {isResultDone === true &&
          <Result 
            results={results}
            data={data}
            handleSendResults={handleSendResults}
          />
        }

      </main>
      
    </div>
  );
}