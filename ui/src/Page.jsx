import React, { Component } from 'react';
import Contents from './Contents.jsx';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { ToastContainer } from 'react-toastify';

class NavBar extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false
        }
    }

    closeMenu = () => {
        this.setState({ isOpen: false });
    }

    toggleOpen = () => {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    }

    render() {
        let menuClassName = 'px-2 pt-2 pb-4 sm:p-0 sm:flex';
        menuClassName += this.state.isOpen ? ' block' : ' hidden';

        return (
            <header className="bg-gray-900 sm:flex sm:justify-between sm:px-6 sm:py-3 sm:items-center">
                <div className="flex items-center justify-between px-4 py-3 sm:p-0 bg-gray-900">
                    <div>
                        <NavLink onClick={this.closeMenu} exact to="/">
                            <img src="http://dkotwt30gflnm.cloudfront.net/assets/spotshare-logo.png" className="h-8" alt="Spotshare, de mooiste fotolocaties bij jou in de buurt" />
                        </NavLink>
                    </div>
                    <div className="sm:hidden">
                        <button onClick={this.toggleOpen} type="button" className="text-gray-400 hover:text-white focus:text-white focus:outline-none">
                            {this.state.isOpen ? <FiX className="fill-current text-white" /> : <FiMenu className="fill-current text-white" />}
                        </button>
                    </div>
                </div>
                <nav className={menuClassName}>
                    <NavLink onClick={this.closeMenu} to="/photos/add" className="block text-white font-semibold rounded hover:bg-gray-800 px-2 py-1">Uploaden</NavLink>
                    <NavLink onClick={this.closeMenu} exact to="/" className="block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2">Home</NavLink>
                    <NavLink onClick={this.closeMenu} exact to="/photos" className="block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2">Photos</NavLink>
                    <NavLink onClick={this.closeMenu} to="/report" className="block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2">Report</NavLink>
                </nav >
            </header >
        );
    }
}


export default function Page() {
    return (
        <div>
            <NavBar />
            <Contents />
            <ToastContainer />
        </div>
    );

}