import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component{

    onSubmit =(expense)=>{
        this.props.startEditExpense( this.props.expense.id, expense);
        this.props.history.push('/');
    }
    onRemove = ()=>{
       
        if(confirm("Are you suer you want to remove this expense?")){
            this.props.startRemoveExpense({id:this.props.expense.id});
            this.props.history.push('/');
        }    

    }
    render(){
        return (
            <div>
                 <div className="page-header">
                     <div className="content-container">
                           <h1 className="page-header__title">Edit Expense</h1>
                     </div>
                </div>
                <div className="content-container">
                    <ExpenseForm 
                        expense={this.props.expense}
                        onSubmit={this.onSubmit}
                    />
                    <button onClick={this.onRemove} className="button button--secondery" >
                        Remove Expense
                    </button>
                </div>
            </div>
        );    
    }
} 

const mapDispatchToProps = (dispatch,props) =>{
    return {
        startEditExpense: (id, expense) => dispatch(startEditExpense( id, expense)),
        startRemoveExpense: (data)=>dispatch(startRemoveExpense(data))
    };
}
const mapStateToProps = (state, props) =>{
    return {
        expense: state.expenses.find((expense)=> expense.id === props.match.params.id)
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(EditExpensePage);