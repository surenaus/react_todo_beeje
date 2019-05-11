import React from 'react';

const link = null

class Pagination extends React.Component {
  constructor(props) {
      super(props);
      //console.log(props)
    this.state = {
        currentPage: localStorage.getItem('page'),
        active: localStorage.getItem('page')
    };
    this.onPageChange = this.onPageChange.bind(this);
  }

    onPageChange(e) {
        let val = 0

        switch (e.target.name) {
            case "next":
                val = this.state.currentPage + 1
                if (val > this.props.total - 1) 
                    val = this.state.currentPage
                    break;

            case "back":
                val = this.state.currentPage - 1
                if (val < 1) 
                    val = this.state.currentPage
                    break;

            default:
                val = e.target.id;
                break;
        }

        if (val !== this.state.currentPage) {
            this.props.parentMethod(val)
            document.getElementsByName(this.state.active)[0].setAttribute("class", "page-item")
            document.getElementsByName(val)[0].setAttribute("class", "page-item active")
            this.setState({ currentPage: val, active: val });
            localStorage.setItem('page', val)
        }
    }
  
    componentDidUpdate() {
        document.getElementsByName(this.state.active)[0].setAttribute("class", "page-item active")

    }


    numbers() {
        let nums = []
        let value = parseInt(this.state.active)
        let total = Math.floor(this.props.total)
        let min = (value - 3 > 0) ? value - 3 : 1
        let max = (value + 3 <= total) ? value + 3 : total
        //console.log(min, max);
        
        for (let index = min; index < max; index++) 
        {
            nums.push(
                (<li key={index} 
                    
                    className={'page-item'}

                    name={index} ref={index}>
                    <a className="page-link" id={index} onClick={this.onPageChange} href={link}>{index}</a>
                </li>
                )
            );
        }
        if (value < total - 3) {
            nums.push(
                (<li key={-1} 
                    className={'page-item'}
                    >
                    <a className="page-link">...</a>
                </li>
                )
            );
        }
        nums.push(
            (<li key={total} 
                
                className={'page-item'}

                name={total} ref={total}>
                <a className="page-link" id={total} onClick={this.onPageChange} href={link}>{total}</a>
            </li>
            )
        );
        return nums
      }
  
  render() {
      return <div>
            <ul className="pagination" style={{ color: "black"}}>
                <li className="page-item"><a className="page-link" name="back" onClick={this.onPageChange} href={link}>Prev</a></li>
                {this.numbers()}
                <li className="page-item"><a className="page-link" name="next" onClick={this.onPageChange} href={link}>Next</a></li>
            </ul>
        </div>
  }
}

export default Pagination;