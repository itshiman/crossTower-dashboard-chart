import React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

class DropDownMenu extends React.Component {
  render() {
    return (
      <div className='float-end '>
        <Dropdown isOpen={this.props.dropdownOpen} toggle={this.props.toggle}>
          <DropdownToggle caret>{this.props.dropdownItem}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={() => {
                this.props.selectItem('Last Week');
              }}>
              Last Week
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              onClick={() => {
                this.props.selectItem('January');
              }}>
              January
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              onClick={() => {
                this.props.selectItem('February');
              }}>
              February
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              onClick={() => {
                this.props.selectItem('March');
              }}>
              March
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              onClick={() => {
                this.props.selectItem('April');
              }}>
              April
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              onClick={() => {
                this.props.selectItem('May');
              }}>
              May
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              onClick={() => {
                this.props.selectItem('June');
              }}>
              June
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              onClick={() => {
                this.props.selectItem('July');
              }}>
              July
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              onClick={() => {
                this.props.selectItem('August');
              }}>
              August
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              onClick={() => {
                this.props.selectItem('September');
              }}>
              September
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              onClick={() => {
                this.props.selectItem('October');
              }}>
              October
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              onClick={() => {
                this.props.selectItem('November');
              }}>
              November
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              onClick={() => {
                this.props.selectItem('December');
              }}>
              December
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default DropDownMenu;
