import { Stack, Center, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Input from '../Input';
import styles from './Calculator.module.css';

enum InputType {
    effectiveUsedCapital = "Effective Used Capital",
    gloablCapital = "Global Capital",
}

function InputForm(props: { label: any; value: any; onChange?: ((params: any) => void) | undefined; }) {


    const { label, value, onChange = () => { } } = props;

    return (
        <div className={styles.inputForm}>
            <div>{label}</div>
            <Input type="number" className={styles.input} value={value || ""} onChange={onChange} />
        </div>

    )

}

function OutputForm(props: { label: any; value: any; }) {


    const { label, value } = props;

    return (
        <div className={styles.outputForm}>
            <div>{label}</div>
            <div className={styles.output}>{value}</div>
        </div>
    )
}

function Calculator() {

    const [inputType, setInputType] = useState<InputType>(InputType.effectiveUsedCapital);

    const [effectiveUsedCapital, setEffectiveUsedCapital] = useState(0);
    const [marginLevrage, setMarginLeverage] = useState(0);
    const [loanToValue, setLoanToValue] = useState(0);

    const [accounts, setAccounts] = useState({
        margin: 0,
        spot: 0
    });

    const [globalCapital, setGlobalCapital] = useState(0);

    const calculateMarginAccountFromEUC = (EUC: number, ML: number) => {

        if (!EUC || !ML) return 0;

        var margin = EUC / (ML / 100);

        return margin;
    }

    const calculateMarginAccountFromGC = (GC: number, ML: number, LTV: number) => {

        if (!GC || !ML || !LTV) return 0;

        var margin = (GC * (LTV / 100)) / ((ML / 100) + (LTV / 100));

        return margin;
    }

    const calculateSpotAccountFromEUC = (EUC: number, LTV: number) => {

        if (!EUC || !LTV) return 0;

        var spot = EUC / LTV * 100;

        return spot;
    }

    const calculateSpotAccountFromGC = (GC: number, ML: number, LTV: number) => {

        if (!GC || !LTV || !ML) return 0;

        var spot = (GC * (ML / 100)) / ((ML / 100) + (LTV / 100))

        return spot;
    }

    const calculateGlobalCapital = (spot: number, margin: number) => {

        return spot + margin;
    }

    const calculateEffectiveUsedCapital = (margin: number, ML: number) => {

        return margin * (ML / 100);
    }

    // y * 0.65 / 3 + y = GC ; x = EUC / 3 ; y = (x * 3) / 0.65 

    const calculate = () => {

        var margin = 0;
        var spot = 0;

        if (inputType === InputType.effectiveUsedCapital) {

            margin = calculateMarginAccountFromEUC(effectiveUsedCapital, marginLevrage);
            spot = calculateSpotAccountFromEUC(effectiveUsedCapital, loanToValue);

            setGlobalCapital(calculateGlobalCapital(spot, margin));
        }


        if (inputType === InputType.gloablCapital) {

            margin = calculateMarginAccountFromGC(globalCapital, marginLevrage, loanToValue);
            spot = calculateSpotAccountFromGC(globalCapital, marginLevrage, loanToValue);

            setEffectiveUsedCapital(calculateEffectiveUsedCapital(margin, marginLevrage));
        }

        setAccounts({ margin, spot });
    }

    const handleChangeEffectiveUsedCapital = (event: any) => {
        setEffectiveUsedCapital(event.target.value);
    }

    const handleChangeMarginLeverage = (event: any) => {
        setMarginLeverage(event.target.value);
    }

    const handleChangeLoanToValue = (event: any) => {
        setLoanToValue(event.target.value);
    }

    const handleChangeGlobalCapital = (event: any) => {
        setGlobalCapital(event.target.value);
    }

    const handleChangeInputType = (event: any) => {
        setInputType(event.target.value);
        setGlobalCapital(0);
        setEffectiveUsedCapital(0);
        setAccounts({ margin: 0, spot: 0 });
    }

    useEffect(() => {

        calculate();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [effectiveUsedCapital, loanToValue, marginLevrage, globalCapital]);

    return (
        <Center h='100vh' >
            <Stack gap={5}>
                <Text>
                    Optimize Capital ( Using Margin Leverage  ) :
                </Text>


                <Stack bg ='white'>
                    <InputForm
                        label={
                            <select onChange={handleChangeInputType} >
                                <option value={InputType.effectiveUsedCapital}>{InputType.effectiveUsedCapital}</option>
                                <option value={InputType.gloablCapital}>{InputType.gloablCapital}</option>
                            </select>}
                        value={inputType === InputType.effectiveUsedCapital ? effectiveUsedCapital : globalCapital}
                        onChange={inputType === InputType.effectiveUsedCapital ? handleChangeEffectiveUsedCapital : handleChangeGlobalCapital}
                    />

                    <InputForm label='Margin Leverage (%)' value={marginLevrage} onChange={handleChangeMarginLeverage} />

                    <InputForm label='Loan To Value (%)' value={loanToValue} onChange={handleChangeLoanToValue} />

                    <OutputForm label='Margin Account' value={Math.round(accounts.margin)} />

                    <OutputForm label='Spot Account' value={Math.round(accounts.spot)} />

                    <OutputForm
                        label={inputType === InputType.effectiveUsedCapital ? InputType.gloablCapital : InputType.effectiveUsedCapital}
                        value={Math.round(inputType === InputType.effectiveUsedCapital ? globalCapital : effectiveUsedCapital)}
                    />
                </Stack>

            </Stack>

        </Center>
    )
}

export default Calculator