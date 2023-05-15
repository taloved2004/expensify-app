import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixures/expenses';
import moment from 'moment';

test('should render expense form correctly', ()=>{
    const wrapper = shallow(<ExpenseForm   />);
    expect(wrapper).toMatchSnapshot();
});

test('should render expense form correctly with expense data', () =>{
    const wrapper = shallow(<ExpenseForm expense={expenses[1]}  />);
    expect(wrapper).toMatchSnapshot();
});

test('should render an error massage for invalid info', ()=>{
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit',{
        preventDefault: () => { }
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should set description on input change',()=>{
    const value = 'New description';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change', {
        target: {value}
    });
    expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', ()=>{
    const value = 'New note';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').simulate('change',{
        target:{value}
    });
    expect(wrapper.state('note')).toBe(value);
});

test('should set amount for valid input',()=>{
    const value = '23.50';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change',{
        target:{value}
    });
    expect(wrapper.state('amount')).toBe(value);

});

test('shouldn`t set amount for valid input',()=>{
    const value = '12.122';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change',{
        target:{value}
    });
    expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form submission',()=>{
    const onSubmitSpy =jest.fn();
    const wrapper = shallow(<ExpenseForm expense = {expenses[0]} onSubmit = { onSubmitSpy } />)
    wrapper.find('form').simulate('submit',{
        preventDefault: () => { }
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });
});

test('should set new date on Date change',()=>{
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on Date change',()=>{
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({focused: true});
    expect(wrapper.state('calendarFocused')).toEqual(true);
});