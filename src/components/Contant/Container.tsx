import { useState } from 'react'
import backgroundCard from  "../../assets/back-card.png"
import frontCard from "../../assets/front-card.png"
import oval from "../../assets/oval.png"
import check from "../../assets/check.png"

export default function Contant (){
  const [number, setNumber] = useState("")
  const [paragraphText, setParagraphText] = useState('0000 0000 0000 0000');
  const [text,setText]=useState("")
  const [month,setMonth]=useState("")
  const [years,setYears]=useState("")
  const [cvc,setCvc]=useState("")
  const [isFormVisible, setIsFormVisible] = useState(true);

  const [isNameValid, setIsNameValid] = useState(true);
  const [isNumberValid, setIsNumberValid] = useState(true);
  const [isMonthValid, setIsMonthValid] = useState(true);
  const [isYearValid, setIsYearValid] = useState(true);
  const [isCvcValid, setIsCvcValid] = useState(true);

  const handleChange = (event:any) => {
    const value = event.target.value;
    const digitsOnly = value.replace(/\D/g, '');
    const truncatedValue = digitsOnly.slice(0, 16);
    let formatValue = "";
    for (let i = 0; i < truncatedValue.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatValue += " ";
      }
      formatValue += truncatedValue[i];
    }

    setNumber(truncatedValue);
    setParagraphText(formatValue.padEnd(16,"0"));
  };
  const handleNameChange = (event:any) => {
    const value = event.target.value.slice(0, 29); // Limit to 19 characters
    setText(value);
  };
  const handleMonthChange =(event:any)=>{
    const value= event.target.value.slice(0,2);
    setMonth(value);
    if(value>12){
      alert("opps")
    }
  }
  const handleYearsChange= (event:any)=>{
    const value= event.target.value.slice(0,2);
    setYears(value)
  }
  const handleCvcChange = (event:any)=>{
    const value = event.target.value.slice(0,3);
    setCvc(value)
  }
  const handleSubmit = () => {
    if (!text) {
      setIsNameValid(false);

    } else {
      setIsNameValid(true);
    }

    if (!number) {
      setIsNumberValid(false);
    } else {
      setIsNumberValid(true);
    }

    if (!month) {
      setIsMonthValid(false);
    } else {
      setIsMonthValid(true);
    }

    if (!years) {
      setIsYearValid(false);
    } else {
      setIsYearValid(true);
    }

    if (!cvc) {
      setIsCvcValid(false);
    } else {
      setIsCvcValid(true);
    }

    if (text && number && month && years && cvc) {
      setIsFormVisible(false);
    }
  };

  return(
    <>
    
       <div className="card-div">
      <div className="back-div">
        <img src={backgroundCard} alt="" className="backgroubd-img" />
        <p className="cvc-p">{cvc || "000"}</p>
      </div>
      <div className="front-div">
        <img src={frontCard}alt="" className="front-card" />
        <img src={oval} alt="" className="oval"  id='oval'/>
        <p className="id">{paragraphText}</p>
        <div className="user-name">
          <p className="name">{text || "Jane Appleseed"}</p>
        </div>
        <div className="creat-card">
          <p className="mm">{month || "00"}</p>
          <p>/</p>
          <p className="yy">{years || "00"}</p>
        </div>
      </div>
    </div>
  <>
    {isFormVisible && (
      <div className="information-div">
        <p className="card-p">Cardholder Name</p>
      <input
       type="text" 
       placeholder="e.g. Jane Appleseed"
       className={isNameValid ? "name-input":"error-name-input"} 
       value={text}
       onChange={handleNameChange}
       />
      <p className="error-name">Write your name...</p>
      <p className="card-p">Card Number</p>
      <input
        type="number"
        placeholder="e.g. 1234 5678 9123 0000"
        className={isNumberValid ? "name-input":"error-name-input"}
        id="number-input"
        value={number}
        onChange={handleChange}
        maxLength={19}
      />
      <p className="numbers-error">Wrong format, numbers only</p>
      <p className="numbers-secerror">shoulde be 16 numbers...</p>
      <div className="cvc-div">
        <div className="mm-yy">
          <p className="card-p">Exp. Date (MM/YY)</p>
          <div className="input-mm-yy">
            <input type="number"
             placeholder="MM"
             className={isMonthValid ? "mm-input":"error-mm-input"}
             value={month}
             onChange={handleMonthChange}

               />
            <input
             type="number" 
             placeholder="YY" 
             className={isYearValid ? "yy-input":"error-mm-input"}
             value={years}
             onChange={handleYearsChange}
              />
          </div>
          <p className="mm-yy-erorr">Can’t be blank</p>
          <p className="number-mm-yyerror">shoulde be 2 numbers...</p>
        </div>
        <div className="cvc-info">
          <p className="card-p">CVC</p>
          <input
           type="number"
            placeholder="e.g. 123"
            className={isCvcValid ? "cvc-input":"error-cvc-input"}
            value={cvc}
            onChange={handleCvcChange}
              />
          <p className="cvc-error">Can’t be blank</p>
          <p className="number-cvc-error">shoulde be 3 numbers...</p>
        </div>
      </div>
        <button className="confrim" onClick={handleSubmit}>Confirm</button>
      </div>
    )}
    {!isFormVisible && (
      <div className="congratulations">
  
      <img src={check} alt="" className="check" />
      <h1>THANK YOU!</h1>
      <p>We’ve added your card details</p>
      <button className="confrim-2"> Continue</button>
    </div>
    )}
    </>
  </>
  )
}