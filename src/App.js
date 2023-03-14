import React from 'react';

import './App.css';

import Table from './Table';
import Chart from './Chart';
import store from './store';
import calculate from './calculations';

export default () => {
    const {
        state,
        setInitial,
        setRate,
        setYears,
        setMonthlyOverpayment,
        setOverpayments
    } = store();
    const updateOverpayment = index => ({ target }) =>
        setOverpayments(
            state.overpayments.map((overpayment, i) =>
                i === index
                    ? { ...overpayment, [target.name]: target.value }
                    : overpayment
            )
        );

    const { monthlyPayment, payments } = calculate({
        initial: +state.initial,
        years: +state.years,
        rate: +state.rate,
        monthlyOverpayment: +state.monthlyOverpayment,
        overpayments: state.overpayments
    });

    return (
        <div>
            <nav className="navbar p-2 mb-4">
                <div className="navbar-brand">Mortgage Calculator</div>
            </nav>
            <div className="container">
                <div className="row">
                    <div id="input-side" className="col-md-4 col-sm-12">
                        <div id="core" className="mb-4">
                            <h2 className="pb-2">Core</h2>
                            <div className="row">
                                <div className="col-md-4 col-sm-12">
                                    <label className="form-label">Amount</label>
                                    <input
                                        maxLength={7}
                                        value={state.initial}
                                        onChange={e => setInitial(e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-4 col-sm-12">
                                    <label className="form-label">Years</label>
                                    <input
                                        type="number"
                                        maxLength={2}
                                        value={state.years}
                                        onChange={e => setYears(e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-4 col-sm-12">
                                    <label className="form-label">Rate</label>
                                    <input
                                        type="number"
                                        step={0.1}
                                        value={state.rate}
                                        onChange={e => setRate(e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        </div>
                        <div id="overpayment">
                            <h2 className="pb-2">Overpayment</h2>
                            <div className="row pb-2">
                                <label className="col-sm-3 col-form-label">Monthly</label>
                                <div className="col-sm-9">
                                    <input
                                        type="number"
                                        maxLength={5}
                                        value={state.monthlyOverpayment}
                                        onChange={e => setMonthlyOverpayment(e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <label className="col-sm-1 col-form-label">#</label>
                                <label className="col-sm-3 col-form-label">Year</label>
                                <label className="col-sm-3 col-form-label">Month</label>
                                <label className="col-sm-3 col-form-label">Amount</label>
                            </div>
                            {state.overpayments.map(({ year, month, amount }, i) => (
                                <div key={i} className="row">
                                    <div className="col-sm-1 col-form-label">
                                        <label className="btn text-muted">{i + 1}</label>
                                    </div>
                                    <div className="col-sm-3 col-form-label">
                                    <input
                                        type="number"
                                        min="0"
                                        max={state.years}
                                        value={year}
                                        name="year"
                                        onChange={updateOverpayment(i)}
                                        className="form-control"
                                    />
                                    </div>
                                    <div className="col-sm-3 col-form-label">
                                    <input
                                        type="number"
                                        min="1"
                                        max="12"
                                        value={month}
                                        name="month"
                                        onChange={updateOverpayment(i)}
                                        className="form-control"
                                    />
                                    </div>
                                    <div className="col-sm-3 col-form-label">
                                    <input
                                        type="text"
                                        value={amount}
                                        name="amount"
                                        onChange={updateOverpayment(i)}
                                        className="form-control"
                                    />
                                    </div>
                                    <div className="col-sm-2 col-form-label">
                                    {i === state.overpayments.length - 1 ? (
                                        <button
                                                className="btn btn-primary"
                                            onClick={() =>
                                                setOverpayments([...state.overpayments, {}])
                                            }
                                        >
                                            ⊕
                                        </button>
                                    ) : (
                                        <button
                                                    className="btn btn-primary"
                                            onClick={() =>
                                                setOverpayments(state.overpayments.filter((_, j) => j !== i))
                                            }
                                        >
                                            🅧
                                        </button>
                                    )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div id="output-side" className="col-md-8 col-sm-12">
                        <div className="row">
                            <div className="col-6">
                                <h2>Estimate</h2>
                            </div>
                            <div className="col-6">
                                <div className="font-monospace text-end fs-4 text-primary">Monthly payment: {(+state.monthlyOverpayment + monthlyPayment).toFixed(2)}</div>
                            </div>
                        </div>
                        <div id="chart" className="pb-4">
                            <Chart payments={payments} />
                        </div>
                        <div id="table" className="container">
                            <div className="col-8 offset-2">
                            <Table payments={payments} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-5 text-center text-muted">
                Based on original work by <a href="https://github.com/paulhoughton/">Paul Houghton</a>. This page is a private copy of <a href="https://github.com/paulhoughton/mortgage">mortgage overpayment calculator</a>.
            </div>
        </div>
    );
};
