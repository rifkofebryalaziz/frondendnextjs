"use client";
import CalculatorButton from "@/app/Kalkulator/Components/CalculatorButton";
import { useMemo, useState } from "react";

type TOperator = "+" | "-";

const Page = () => {
  const [digit1, setDigit1] = useState<number>();
  const [digit2, setDigit2] = useState<number>();
  const [result, setResult] = useState<number>();
  const [operator, setOperator] = useState<TOperator>();

  // const [resultScreen, setResultScreen] = useState<string>();

  const onDigitClick = (value: number) => {
    const reset = () => {
      setOperator(undefined);
      setDigit2(undefined);
      setResult(undefined);
    };

    if (result !== undefined) {
      reset();
      setDigit1(value);
      return;
    }
    if (!operator) return setDigit1(value);
    setDigit2(value);
  };

  const onResultClick = () => {
    if (!digit1 || !digit2 || !operator) return;

    let _result = 0;
    if (operator === "+") {
      _result = digit1 + digit2;
    } else {
      _result = digit1 - digit2;
    }
    setResult(_result);
  };

  const resultScreen = useMemo(() => {
    const _digit1 = digit1 === undefined ? "" : digit1;
    const _digit2 = digit2 === undefined ? "" : digit2;
    const _operator = operator === undefined ? "" : operator;
    const _result = result === undefined ? "" : `= ${result}`;

    const _resultScreen = `${_digit1} ${_operator} ${_digit2} ${_result}`;
    return _resultScreen;
  }, [digit1, digit2, operator, result]);

  // useEffect(() => {
  //   const _digit1 = digit1 === undefined ? "" : digit1;
  //   const _digit2 = digit2 === undefined ? "" : digit2;
  //   const _operator = operator === undefined ? "" : operator;
  //   const _result = result === undefined ? "" : `= ${result}`;

  //   const _resultScreen = `${_digit1} ${_operator} ${_digit2} ${_result}`;
  //   setResultScreen(_resultScreen);
  // }, [digit1, digit2, operator, result]);

  return (
    <main className="bg-white text-black w-full h-screen flex justify-center items-center">
      <div className="grid grid-cols-3 gap-2 bg-slate-300 p-4 rounded-2xl shadow-2xl">
        <div className="h-20 bg-black/80 col-span-3 rounded-2xl place-content-end flex items-center text-white font-bold p-4">
          {resultScreen}
        </div>
        {[...Array(9)].map((_, i) => {
          const _digit = i + 1;
          return (
            <CalculatorButton
              key={_digit}
              onClick={() => onDigitClick(_digit)}
              className="bg-slate-400"
            >
              {_digit}
            </CalculatorButton>
          );
        })}

        <CalculatorButton
          onClick={() => setOperator("+")}
          className="bg-blue-300"
        >
          +
        </CalculatorButton>

        <CalculatorButton
          onClick={() => setOperator("-")}
          className="bg-red-300"
        >
          -
        </CalculatorButton>
        <CalculatorButton onClick={onResultClick} className="bg-green-400">
          =
        </CalculatorButton>
      </div>
    </main>
  );
};

export default Page;