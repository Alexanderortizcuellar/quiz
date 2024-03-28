import React from 'react'
import { useState } from 'react'
import './Question.css'
import bible from '../../assets/bible.png'
import getQuestion from '../../../apis/api'


function Question() {
    const defaultQuestion  = {"question":`What is the capital of France?`, 
    "correct": "Paris", "options": ["Paris", "London", "Berlin", "Madrid"]}
    const [question, setQuestion] = useState('')
    const [selected, setSelected] = useState(null)
    const [color, setColor] = useState('dodgerblue')
    const [score, setScore] = useState(0)


    const  get = () => {
        getQuestion().then(data => {
            if (selected === null) {
                console.log("vibrate")
                navigator.vibrate(100)
                return
            }
            if(selected === question.answer) {
                setScore(score + 1)
                setColor('green')
            } else {
                setColor('crimson')
            }
            
            setTimeout(() => {
                setSelected(null)
                setColor('dodgerblue')
                setQuestion(data)
            }, 1000)
            
        })
    }

    const higliht = (option) => {
        setSelected(option)
    }

    return (
        <>
        <div className="question" style={{backgroundImage: `url(${bible})`}}>
            <div className="header">
                <h3>Bible Trivia</h3>
                <h3>Score: {score}</h3>
            </div>
            <p>
                {question !== '' ? question.question : defaultQuestion.question} 
            </p>
            <ul>
                {question !== '' ? question.options.map((option, index) => <li key={index} onClick={()=>{higliht(option)}} 
                style={{backgroundColor: selected === option ? color : 'transparent'}}>{option}</li>) : 
                defaultQuestion.options.map((option, index) => <li key={index} 
                onClick={()=>{setSelected(option)}}>{option}</li>)}
            </ul>
            <button className='btn-submit' onClick={get}>Submit</button>
        </div>  
        
        </>
    )
}

export default Question
