import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getList, showUpdate, showDelete } from './billingCycleActions'

class BillingCycleList extends Component {
    init_order = 'asc';
    pagSkip = 0;
    pagLimit = 5;

    componentWillMount() {
        this.props.getList(`sort=year,month&sortOrder=desc,desc&skip=${this.pagSkip}&limit=${this.pagLimit}`)
    }

    orderBy(campo) {
        let urlMount = `sort=${campo}&sortOrder=${this.init_order}`
        if (this.pagSkip !== undefined && this.pagLimit !== undefined) {
            urlMount = urlMount + `&skip=${this.pagSkip}&limit=${this.pagLimit}`
        }
        this.props.getList(urlMount)
        this.init_order = this.init_order === 'asc' ? 'desc' : 'asc'
    }

    setLimit(event) {
        this.pagLimit = event;
        this.props.getList(`sort=year,month&sortOrder=desc,desc&skip=${this.pagSkip}&limit=${this.pagLimit}`)
    }

    setSkitp(value) {
        this.pagSkip = this.pagSkip + value;
        this.props.getList(`sort=year,month&sortOrder=desc,desc&skip=${this.pagSkip}&limit=${this.pagLimit}`)
    }

    renderRows() {
        const list = this.props.list || []
        return list.map(bc => (
            <tr key={bc._id}>
                <td>{bc.name}</td>
                <td>{bc.month}</td>
                <td>{bc.year}</td>
                <td>
                    <button className='btn btn-warning' onClick={() => this.props.showUpdate(bc)}>
                        <i className='fa fa-pencil'></i>
                    </button>
                    <button className='btn btn-danger' onClick={() => this.props.showDelete(bc)}>
                        <i className='fa fa-trash-o'></i>
                    </button>
                </td>
            </tr>
        ))
    }

    render() {
        return (
            <div>
                <table className='table table-striped table-hover'>
                    <thead>
                        <tr>
                            <th onClick={() => this.orderBy('name')}><span class="glyphicon glyphicon-sort" aria-hidden="true"></span>Nome</th>
                            <th onClick={() => this.orderBy('month')}><span class="glyphicon glyphicon-sort" aria-hidden="true"></span>Mês</th>
                            <th onClick={() => this.orderBy('year')}><span class="glyphicon glyphicon-sort" aria-hidden="true"></span>Ano</th>
                            <th className='table-actions'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>

                <nav aria-label="aaaa">
                    <ul class="pager">
                        <li><a href="javascript:;" onClick={() => this.setSkitp(this.pagLimit * (-1))}>Voltar</a></li>
                        <li><a href="javascript:;" onClick={() => this.setSkitp(this.pagLimit)}>Proximo</a></li>
                    </ul>
                </nav>


                <nav aria-label="Page navigation">
                    <ul class="pagination">
                        <li><a href="javascript:;" onClick={() => this.setLimit(5)}>5</a></li>
                        <li><a href="javascript:;" onClick={() => this.setLimit(10)}>10</a></li>
                        <li><a href="javascript:;" onClick={() => this.setLimit(15)}>15</a></li>
                        <li><a href="javascript:;" onClick={() => this.setLimit(20)}>20</a></li>
                        <li><a href="javascript:;" onClick={() => this.setLimit(25)}>25</a></li>
                    </ul>
                </nav>


            </div>



        )
    }
}

const mapStateToProps = state => ({ list: state.billingCycle.list })
const mapDispatchToProps = dispatch => bindActionCreators({ getList, showUpdate, showDelete }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleList)