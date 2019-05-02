import React from 'react';

const link = null

class Pagination extends React.Component {
  constructor(props) {
      super(props);
      //console.log(props)
    this.state = {
        currentPage: 1,
        active: 1
    };
    this.onPageChange = this.onPageChange.bind(this);
  }

    onPageChange(e) {
        let val = 0
        
        if (e.target.name === "next") {
            val = this.state.currentPage + 1
            if (val > this.props.total - 1) {
                val = this.state.currentPage
            }
        } else {
            if (e.target.name === "back") {
                val = this.state.currentPage - 1
                if (val < 1) {
                    val = this.state.currentPage
                }
            } else {
                val = e.target.id;
            }
        }

        if (val !== this.state.currentPage) {
            this.props.parentMethod(val)
            document.getElementsByName(this.state.active)[0].setAttribute("class", "page-item")
            document.getElementsByName(val)[0].setAttribute("class", "page-item active")
            this.setState({ currentPage: val, active: val });
        }
    }

    numbers() {
        let nums = []
        nums.push(
            (<li key={1} className="page-item active" name='1' ref='1'><a className="page-link" id='1' onClick={this.onPageChange} href={link}>1</a></li>)
        )
        for (let index = 2; index < this.props.total; index++) 
            nums.push(
                (<li key={index} className="page-item" name={index} ref={index}><a className="page-link" id={index} onClick={this.onPageChange} href={link}>{index}</a></li>)
            );
        return nums
      }
  
  render() {
      return <div>
          <ul className="pagination" style={{ color: "black"}}>

                    <li className="page-item"><a className="page-link" name="back" onClick={this.onPageChange}   href={link}>Previous</a></li>
                    {this.numbers()}
                    <li className="page-item"><a className="page-link" name="next" onClick={this.onPageChange} href={link}>Next</a></li>
                </ul>
            </div>
  }
}

export default Pagination;