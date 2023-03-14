import { useState } from 'react';

const defaultState = {
    initial: '200000',
    rate: '5',
    years: '25',
    monthlyOverpayment: '0',
    overpayments: [{ month: '1', year: '0', amount: '0' }]
}

function getParams() {
    return window.location.search.replace(/^\?/, '');
}

function encode(state) {
    return decodeURIComponent(window.jQuery.param(state));
}

function decode(params) {
    return window.jQuery.deparam(params);
}

function update(setState, newState) {
    setState(newState);
    const url = new URL(window.location);
    url.search = `?${encode(newState)}`;
    window.history.pushState(newState, "", url);
}

function store() {
    const originalState = { ...defaultState, ...decode(getParams())};
    const [state, setState] = useState(originalState);
    const setInitial = v => update(setState, { ...state, initial: v });
    const setRate = v => update(setState, { ...state, rate: v });
    const setYears = v => update(setState, { ...state, years: v });
    const setMonthlyOverpayment = v => update(setState, { ...state, monthlyOverpayment: v });
    const setOverpayments = v => update(setState, { ...state, overpayments: v });

    return {
        state,
        setState,
        setInitial,
        setRate,
        setYears,
        setMonthlyOverpayment,
        setOverpayments
    }
}

export default store;
