
/* eslint-disable react/prop-types */
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

export const Result = ({ data, results }) => {

  return (
    <div> 
      <h1> Resultados </h1>
            { data &&
            data.map((question) => {
              return (
                <div className="box" key={question.id}>
                  <h1>{question.question}</h1>
                  <h2>{question.info}</h2>
                  {question.options.map((option, index) => (
                    
                    <button
                  key={option}
                  style={{
                    backgroundColor:
                      option === question.answer
                        ? results.includes(option)
                          ? "green" // Correcto
                          : ""
                        : results.includes(option)
                        ? "#C70039" // Incorrecto
                        : "",
                  }}
                >
                  {fig[index].svg}                  
                  {option}
                  {results.includes(option) && option !== question.answer && (
                    <span style={{ color: "white" }}>
                      {" "}
                      (Correcta: {question.answer})
                    </span>
                  )}
                </button>
                    
                  ))
                }
                </div>
                
                );
              })}
          </div>
  )
}

